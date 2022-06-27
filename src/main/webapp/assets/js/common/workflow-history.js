$(document).ready(function () {
    let borderColors = ['border-success', 'border-danger', 'border-info', 'border-dark', 'border-secondary'];//_.shuffle();
    const taskHeaderTemplate = `<div class="workflow-history__subheader header {borderColor}">
				<span class="font-weight-bold">{moduleName}: {taskHeaderReference} - {taskHeaderProcessName}</span>{attachments}
			</div>`;
    const taskDetailTemplate = `<div class="workflow-history__timeline--component {borderColor}">
			<div class="timeline-component__marker {borderColor}">
			</div>
			<div class="timeline-component__date">{taskDetailEndDate}</div>
				<div class="timeline-component__body">
					<div class="timeline-component__body--action font-weight-bold text-primary">{taskDetailAction}</div>
					<div class="timeline-component__body--content font-italic text-dark comments">Remarks: {taskDetailComments}</div>
					<div class="timeline-component__body--user text-right small text-dark">{taskDetailUserName}</div>
				</div>
			</div>`;
    let $container = $('.workflow-history__timeline');
    let html = [];

    const $enableWorkflowHistory = $('body').find('[data-enable-workflow-history]');
    if (!$enableWorkflowHistory || !$enableWorkflowHistory.length) {
        return;
    }
    let referenceNumbers = [];
    $enableWorkflowHistory.each((index, element) => {
        const $element = $(element);

        referenceNumbers.push($element.text() || $element.val());
        referenceNumbers.push($element.data('enableWorkflowHistory'));
    });
    if (!referenceNumbers.length) {
        return;
    }

    const url = "workflow/taskDetail/findByReferences/" + referenceNumbers.join(',');
    axios.get(url)
        .then(response => {
            const headerList = Util.getProperty(response, 'data.headers') || [];
            const detailsList = Util.getProperty(response, 'data.details') || [];
            const filesList = Util.getProperty(response, 'data.files') || [];
            if (!headerList || headerList.length <= 0) {
                return;
            }
            html = [];
            let counter = headerList.length;
            for (let i = (counter - 1); i >= 0; i--) {
                let borderColor = borderColors.pop();
                let referenceNumber = Util.getProperty(headerList[i], 'ackId');
                let headerHtml = taskHeaderTemplate.replaceAll('{taskHeaderReference}', referenceNumber);
                headerHtml = headerHtml.replaceAll('{moduleName}', Util.getProperty(headerList[i], 'processModuleCode'));
                headerHtml = headerHtml.replaceAll('{taskHeaderProcessName}', Util.getProperty(headerList[i], 'processName'));
                headerHtml = headerHtml.replaceAll('{borderColor}', borderColor);
                headerHtml = headerHtml.replaceAll('{attachments}', getFiles(filesList, referenceNumber));
                html.push(headerHtml);

                detailsList.forEach(taskDetail => {
                    let detailHtml = taskDetailTemplate.replaceAll('{borderColor}', borderColor);
                    let endDate = Util.getProperty(taskDetail, 'endDate');
                    if (Util.getProperty(taskDetail, 'ackId') === referenceNumber && !!endDate) {
                        detailHtml = detailHtml.replaceAll('{taskDetailAction}', Util.getProperty(taskDetail, 'stepName') + " - " + Util.getProperty(taskDetail, 'actionName'));
                        detailHtml = detailHtml.replaceAll('{taskDetailEndDate}', new Date(endDate).toLocaleString());
                        detailHtml = detailHtml.replaceAll('{taskDetailComments}', Util.getProperty(taskDetail, 'comments'));
                        detailHtml = detailHtml.replaceAll('{taskDetailUserName}', Util.getProperty(taskDetail, 'currentUser'));
                        html.push(detailHtml);
                    }
                });
            }
            $container.html(html.join(''));
            showWorkflowHistoryToggle();
        })
        .catch(err => console.log(err));
    const $toggleDiv = $(".workflow-history__toggle");
    const $toggleBtn = $(".workflow-history__toggle button");
    const $workflowHistoryContainer = $(".workflow-history__container");
    const $workflowHistoryInnerContainer = $(".workflow-history__inner-container");

    function showWorkflowHistoryToggle() {
        $toggleDiv.removeClass("d-none");
    }

    //Get Files attached during workflow stages
    function getFiles(filesList, referenceNumber) {
        let filesHtml = [];
        const attachmentsTemplate = `<hr><span class="text-muted font-italic">Attachments</span>
				<ul class="text-primary">
					{attachmentFiles}
				</ul>
			</div>`;
        const attachmentFileTemplate = `<li><a href="{fileUrl}" target="_blank"><i class="text-primary icofont icofont-file-pdf"></i> {fileCategory} ({fileName})</a></li>`;
        for (let i in filesList) {
            if (filesList.hasOwnProperty(i) && i == referenceNumber) {
                for (let fileKey in filesList[i]) {
                    if (filesList[i].hasOwnProperty(fileKey)) {
                        let file = filesList[i][fileKey];
                        filesHtml.push(
                            attachmentFileTemplate.replaceAll('{fileUrl}', 'fileManager/view/' + fileKey)
                                .replaceAll('{fileCategory}', file.name)
                                .replaceAll('{fileName}', file.specificName));
                    }
                }
            }
        }
        return (filesHtml.length > 0) ? attachmentsTemplate.replaceAll('{attachmentFiles}', filesHtml.join('')) : '';
    }

    $toggleBtn.on("click", function () {
        const isNotOpen = $workflowHistoryContainer.hasClass("--off-view");

        if (isNotOpen) {
            $toggleDiv.removeClass("--in-view");
            $workflowHistoryContainer.removeClass("--off-view");
            $workflowHistoryInnerContainer.removeClass("animate__bounceOutRight")
                .addClass("animate__bounceInRight");
        } else {
            $workflowHistoryInnerContainer.removeClass("animate__bounceInRight")
                .addClass("animate__bounceOutRight");
        }
    });

    $workflowHistoryInnerContainer.on('animationend', () => {
        const isClosing = $workflowHistoryInnerContainer.hasClass("animate__bounceOutRight");
        if (isClosing) {
            $workflowHistoryContainer.addClass("--off-view");
            $toggleDiv.addClass("--in-view");
        }
    });
    showWorkflowHistoryToggle();
})
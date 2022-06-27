Vue.component('v-select', VueSelect.VueSelect)
Vue.prototype.window = window;

var fcdApplicationValidation = new Vue({
    el: '#fcdApplicationValidation',
    data: {
        //form traversal
        fcdApplicationValidationSteps: [
            'Application',
            'Findings',
        ],
        fcdApplicationValidationStep: 'Application',
        completeSteps: [],

        applicationItems: [],
        applicationAttachments: [],
        currencies: [],

        rejectionComments: '',
        findings: '',

        //currency inspection
        editingCurrencyItem: null,
        currenciesInspected: [],
        inspectedCurrency: {
            "item": 0,
            "currency": '',
            "amount": '',
            "usdEquivalent": '',
            "exchangeRate": ''
        },

        totalUsdEquivalent: 0,

        //Errors
        inspectedCurrenciesErrors: {
            currency: false,
            amount: false,
        },

        inspectedCurrenciesMessages: {
            currency: '',
            amount: ''
        },

        testVar: '',
    },
    methods: {
        //=============form traversal==========//
        nextTab(currentTab) {
            const currentIndex = this.fcdApplicationValidationSteps.indexOf(currentTab, 0);

            if (currentIndex < this.fcdApplicationValidationSteps.length - 1) {
                // move to the next tab
                this.fcdApplicationValidationStep = this.fcdApplicationValidationSteps[currentIndex + 1];

            } else {
                if (this.validateForm() === true) {
                    swal("Warning", "Kindly complete mandatory inputs before submission", "warning");
                } else {
                    this.postApprovalData()
                }
            }
        },

        backTab(currentTab) {
            const currentIndex = this.fcdApplicationValidationSteps.indexOf(currentTab, 1);

            if (currentIndex < this.fcdApplicationValidationSteps.length + 1) {
                // move to the next tab
                this.fcdApplicationValidationStep = this.fcdApplicationValidationSteps[currentIndex - 1];
            } else {
                // validate or submit
            }
        },
        //=====================================//

        getApplicationItems(applicationRef) {
            axios.get($("input[name=Root]").val() + '/api/fcd/get-application-items/'.concat(applicationRef))
                .then(response => {
                    if (response.data.payload == null) {
                        return;
                    }
                    this.applicationItems = response.data.payload;
                }).catch(
                error => {

                });
        },
        getApplicationAttachments: function (applicationRef) {

            axios.get($("input[name=Root]").val() + '/fileManager/getFiles/'.concat(applicationRef))
                .then(response => {
                    if (response.data.payload == null) {
                        return;
                    }
                    this.applicationAttachments = response.data.payload;

                }).catch(
                error => {

                });
        },

        //============Form Validation==========//
        validateForm() {
            var validationError = false;

            if (this.applicationItems === '' || typeof this.applicationItems === 'undefined') {
                new PNotify({
                    title: "Validation Failure",
                    text: "missing items",
                    type: 'warning'
                });
                validationError = true;
            }
            return validationError;
        },
        //=====================================//
        //=========Form Submission=============//
        postApprovalData() {

            let Data = {};
            Data["workflowReference"] = window.ackId;
            Data["findingsAfterSearch"] = this.findings;
            Data["totalItemsInspected"] = this.currenciesInspected.length;
            Data["totalValueInspected"] = this.totalUsdEquivalent;

            if (this.currenciesInspected !== '') {
                Data["currenciesInspected"] = this.currenciesInspected;
            }

            let approveApplicationSettings = {
                type: 'POST',
                url: 'fcd/approve',
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(Data),
                success: (response) => {
                    window.showLoader = false;

                    swal({
                            title: "Currency Declaration - Approval",
                            text: "Application approved. " + response.reference,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonClass: "btn-danger",
                            confirmButtonText: "ok",
                            closeOnConfirm: true
                        },
                        function () {
                            window.location.href = "dashboard";
                        });

                },
                error: (xhr) => {
                    swal("Submission Failed!", xhr.responseJSON.message, "error");
                }
            };

            swal({
                    title: "Currency Declaration - Approval",
                    text: "Kindly confirm approving",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Approve",
                    closeOnConfirm: true
                },
                function () {

                    window.showLoader = true;
                    $.ajax(approveApplicationSettings);

                });
        },

        rejectApplicationModal() {
            $('#reject-application-modal').modal();
        },
        rejectApplication() {

            let Data = {};
            Data["workflowReference"] = window.ackId;
            Data["rejectionComments"] = this.rejectionComments;

            if (this.rejectionComments === '' || typeof this.rejectionComments === 'undefined') {
                new PNotify({
                    title: "Validation Failure",
                    text: "Kind provide comment",
                    type: 'warning'
                });
                return;
            }

            let rejectApplicationSettings = {
                type: 'POST',
                url: 'fcd/reject-application',
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(Data),
                success: (response) => {
                    window.showLoader = false;

                    swal({
                            title: "Currency Declaration - Rejection",
                            text: "Application rejected. " + response.reference,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonClass: "btn-danger",
                            confirmButtonText: "ok",
                            closeOnConfirm: true
                        },
                        function () {
                            window.location.href = "dashboard";
                        });

                },
                error: (xhr) => {
                    swal("Submission Failed!", xhr.responseJSON.message, "error");
                }
            };

            swal({
                    title: "Currency Declaration - Rejection",
                    text: "Kindly confirm rejecting",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Reject",
                    closeOnConfirm: true
                },
                function () {

                    window.showLoader = true;
                    $.ajax(rejectApplicationSettings);

                });
        },

        //=====================================//

        getCurencies() {

            axios.get($("input[name=Root]").val() + '/api/reference/currency/rate')
                .then(response => {
                    if (response.data == null) {
                    }
                    this.currencies = response.data.payload || [];

                }).catch(
                error => {

                });
        },
        selectedCurrencyOption(value) {
            this.inspectedCurrency.currency = value;
        },
        //==========Currencies Util=========//
        inspectedCurrenciesDone() {
            return this.inspectedCurrency.currency !== '' &&
                this.inspectedCurrency.amount !== ''
        },
        toggleCurrencyItem(i) {
            this.editingCurrencyItem = i;
            this.inspectedCurrency = this.currenciesInspected[i];
        },
        deleteCurrencyItem(ind) {
            swal({
                    title: "Confirmation?",
                    text: "Are you sure you want to delete this item?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Yes!",
                    closeOnConfirm: true
                },
                () => {
                    this.inspectedCurrency = this.currenciesInspected[ind];
                    this.totalUsdEquivalent = parseInt(this.totalUsdEquivalent) - parseInt(this.inspectedCurrency.usdEquivalent);
                    console.log("Total => ", this.totalUsdEquivalent);

                    this.currenciesInspected.splice(ind, 1);
                })
        },
        saveCurrency() {
            if (this.inspectedCurrenciesDone()) {
                swal({
                        title: "Currency Declaration",
                        text: "Do you really want to add ?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "Add",
                        closeOnConfirm: true
                    },
                    () => {

                        if (this.editingCurrencyItem !== null) {

                            this.inspectedCurrency.usdEquivalent = Math.ceil(this.dollarValue(this.inspectedCurrency.amount, this.inspectedCurrency.currency))

                            this.totalUsdEquivalent = parseInt(this.totalUsdEquivalent) + parseInt(this.inspectedCurrency.usdEquivalent);

                            console.log("New => ", this.inspectedCurrency.usdEquivalent);
                            console.log("Total => ", this.totalUsdEquivalent);

                            this.currenciesInspected[this.editingCurrencyItem] = {
                                ...this.inspectedCurrency,
                                item: this.editingCurrencyItem + 1
                            }
                        } else {
                            this.inspectedCurrency.usdEquivalent = Math.ceil(this.dollarValue(this.inspectedCurrency.amount, this.inspectedCurrency.currency))

                            this.totalUsdEquivalent = parseInt(this.totalUsdEquivalent) + parseInt(this.inspectedCurrency.usdEquivalent);

                            console.log("New => ", this.inspectedCurrency.usdEquivalent);
                            console.log("Total => ", this.totalUsdEquivalent);

                            this.currenciesInspected.push({
                                ...this.inspectedCurrency,
                                item: this.currenciesInspected.length
                            });
                            this.inspectedCurrency = {
                                "item": 0,
                                "currency": '',
                                "amount": '',
                                "usdEquivalent": '',
                            }
                        }
                        this.editingCurrencyItem = null;

                    })
            } else {
                swal({
                        title: "Validation Error",
                        text: 'Please Enter all the required item fields',
                        type: "error",
                    },
                    () => {
                        this.selectedCurrenciesError();
                    }
                );
            }
        },
        selectedCurrenciesError() {
            if (this.inspectedCurrency.currency === '') {
                this.inspectedCurrenciesErrors.currency = true;
                this.inspectedCurrenciesMessages.currency = 'Currency is mandatory';
            }

            if (this.inspectedCurrency.amount === '') {
                this.inspectedCurrenciesErrors.amount = true;
                this.inspectedCurrenciesMessages.amount = 'Currency is mandatory';
            }
        },
        //=====================================//

        //=============Currency================//
        dollarValue(amount, currency) {
            if (currency === 'USD' || amount === 0.00 || currency === '') {
                return amount;
            } else {
                let ci = this.currencies.findIndex(a => a.name === currency);
                let cd = this.currencies.findIndex(a => a.name === 'USD');
                let a = (amount * this.currencies[ci].value) / this.currencies[cd].value;
                return a;
            }
        },
        //=====================================//
    },
    mounted() {
        console.log("hit me", window.ackId);

        this.getApplicationItems(window.ackId);
        this.getApplicationAttachments(window.ackId);
        this.getCurencies();

    }
});

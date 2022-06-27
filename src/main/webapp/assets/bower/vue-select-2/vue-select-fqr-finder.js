Vue.component('v-select', VueSelect.VueSelect);

const vueApp = new Vue({
    el: '#app',
    data: {
        contextPath: $('input[name="Root"]').val(),
        finalQuery: '',
        minYear: 2021,
        operations: [
            {name: 'Equal', value:'=='},
            {name: 'Not Equal', value:'!=='},
            {name: 'Greater Than', value:'>'},
            {name: 'Greater than Or Equal', value:'>='},
            {name: 'Less Than', value:'<'},
            {name: 'Less than Or Equal', value:'<='},
            {name: 'In', value:'=in='},
            {name: 'Not In', value:'=out='},
            {name: 'Between', value:'between'},
        ],
        searchObj: {
            regDate: {fieldName: 'registrationDate', op: '', value: '', value2: ''},
            procOffice: {fieldName: 'processingOffice', op: '', value: '', value2: ''},
            entOffice: {fieldName: 'entryOffice', op: '', value: '', value2: ''},
            entRegNumber: {fieldName: 'entryRegistrationNumber', op: '', value: '', value2: ''},
            hsCode: {fieldName: 'hsCode', op: '', value: '', value2: ''},
            product: {fieldName: 'productDescription', op: '', value: '', value2: ''},
            qtyLitres: {fieldName: 'quantityLitres', op: '', value: '', value2: ''},
            qtyKgs: {fieldName: 'quantityKilograms', op: '', value: '', value2: ''},
            exitDate: {fieldName: 'exitDate', op: '', value: '', value2: ''},

        },

        // result set
        dataTable: null,
        pageSize: 50,
    },
    computed: {
        sortedFields() {
            return this.sortArray(this.fields, 'name');
        },
        sortedOperations() {
            return this.sortArray(this.operations, 'name');
        },
    },
    methods: {
        showSecondOpt(op) {
            return op === 'between' || op === '=in=' || op === '=out=';
        },
        /**
         * Returns a sorted array
         * @param arr this Arrray to be sorted
         * @param prop field to sort array by
         */
        sortArray(arr, prop) {
            return arr.sort((a, b) => (a[prop] > b[prop]) ? 1 : ((b[prop] > a[prop]) ? -1 : 0));
        },
        /**
         * Removes empty search strings from the searchObj
         */
        resetFilter() {
            this.searchObj = {
                regDate: {fieldName: 'registrationDate', op: '', value: '', value2: ''},
                procOffice: {fieldName: 'processingOffice', op: '', value: '', value2: ''},
                entOffice: {fieldName: 'entryOffice', op: '', value: '', value2: ''},
                entRegNumber: {fieldName: 'entryRegistrationNumber', op: '', value: '', value2: ''},
                hsCode: {fieldName: 'hsCode', op: '', value: '', value2: ''},
                product: {fieldName: 'productDescription', op: '', value: '', value2: ''},
                qtyLitres: {fieldName: 'quantityLitres', op: '', value: '', value2: ''},
                qtyKgs: {fieldName: 'quantityKilograms', op: '', value: '', value2: ''},
                exitDate: {fieldName: 'exitDate', op: '', value: '', value2: ''},
            }
        },
        /**
         * Constructs the query string based on parameter entered by user
         */
        constructSearchString() {
            let arr = [];
            let arr2 = [];
            let searchString = '';
            // simplify searchObj
            for(let i in this.searchObj) {
                if (this.searchObj[i].fieldName !== 'registrationDate'
                    || this.searchObj[i].fieldName !== 'assessmentDate'
                    || this.searchObj[i].fieldName !== 'registrationYear') {
                    this.searchObj[i].value = (this.searchObj[i].value).toUpperCase();
                }
                if (this.searchObj[i].op === 'between') {
                    // push the object to the array
                    arr.push({
                        field: this.searchObj[i].fieldName,
                        op: '>=',
                        value: this.searchObj[i].value
                    });
                    arr.push({
                        field: this.searchObj[i].fieldName,
                        op: '<=',
                        value: this.searchObj[i].value2
                    });
                } else if (this.searchObj[i].op === '=in=' || this.searchObj[i].op === '=out=') {
                    // push value as (value1, value2)
                    arr.push({
                        field: this.searchObj[i].fieldName,
                        op: this.searchObj[i].op,
                        value: '('+ this.searchObj[i].value + ',' + this.searchObj[i].value2 + ')',
                    });
                } else {
                    arr.push({
                        field: this.searchObj[i].fieldName,
                        op: this.searchObj[i].op,
                        value: this.searchObj[i].value
                    });
                }
            }
            // leaves out empty values
            for(let j of arr) {
                if (j.op !== '' && j.value !== ''){
                    arr2.push(j);
                }
            }
            // create query string
            arr2.forEach(item => {
                console.log('in for each')
                if (item.op === '=in=' || item.op === '=out=') {
                    console.log('is in or out')
                    searchString += item.field + item.op + item.value + ';';
                } else {
                    searchString += item.field + item.op + "'" + item.value + "'" + ';';
                }
            })

            return searchString;
        },
        search() {
            // close the modal
            $("#finder-modal").modal('hide');

            let query = this.constructSearchString();
            // remove trailing semi-colon
            query = query.substr(0, query.length-1);

            console.log(query);

            // return if nothing filled in, fetch 500 records from db
            if(query === '') {
                this.pageSize = 500;
            }

            let dtable = this.dataTable;

            let settings = {
                url: "rest/sad/fqr_finder/all/paged?pageSize=" + this.pageSize,
                method: "POST",
                timeout: 0,
                headers: {
                    "Content-Type": "text/plain"
                },
                data: query,
            };

            $.ajax(settings).done(function (response) {
                dtable.clear().draw();
                if (response) {
                    response.forEach(result => {
                        dtable.row.add([
                            result.customsOfficeCode,
                            result.declarantReferenceNumber,
                            result.registrationSerial,
                            result.registrationNumber,
                            result.registrationDate,
                            result.assessmentNumber,
                            result.assessmentDate,
                            result.numberOfItems,
                            result.importerConsigneeTpin,
                            result.importerConsigneeName,
                            result.exporterName,
                            result.selectivityLane,
                            '<div class="dropdown-primary dropdown open">' +
                            '<button class="btn btn-primary dropdown-toggle waves-effect waves-light " type="button" id="dropdown-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button> ' +
                            '<div class="dropdown-menu" aria-labelledby="dropdown-2" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut" x-placement="bottom-start" style="position: absolute; transform: translate3d(0px, 40px, 0px); t' +
                            ': 0px; left: 0px; will-change: transform;"> ' +
                            '<a target="_blank" class="dropdown-item waves-light waves-effect" href="sad/summary-review?id=' + result.id + '"><i class="fa fa-pencil"></i>View</a> ' +
                            '<div class="dropdown-divider"></div> ' +
                            '<a target="_blank" class="dropdown-item waves-light waves-effect" href="workflow/transactions?transaction=' + result.workflowReference + '"><i class="fa fa-check-square-o"></i>Task Details</a> ' +
                            '</div> </div>'
                        ]).draw(false)
                    })
                } else {
                    Swal.fire({
                        icon: 'info',
                        title: 'No Results Found',
                        text: 'There are no results found for the search criteria given.',
                    })
                }
            }).fail(function (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error Occurred',
                    text: 'An error occurred, please check your network and try again',
                })
            });

            this.resetFilter();
        },
        /**
         * Opens the modal on load
         */
        openOnLoad() {
            $("#finder-modal").modal();
        },
    },
    mounted() {
        this.openOnLoad();
        this.dataTable = $('#result-table').DataTable({
            "order": [[ 4, "desc" ]]
        });
        console.log(this.dataTable.order());
    },
})
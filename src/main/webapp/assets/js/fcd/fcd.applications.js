let fcdApplications = new Vue({
    el: "#fcdApplications",
    data: {
        url: $("input[name=Root]").val() + '/api/fcd/get-fcd-applications',
        contentType: '',
        data: '',
        hasApplications: false,
        applications: [],
        dataTable: null,
    },
    methods: {
        getFCDApplications: function () {
            axios.get(this.url)
                .then(response => {
                    if (!response.data.payload) {
                        this.hasApplications = false;
                        return;
                    }
                    this.applications = response.data.payload;
                    this.hasApplications = this.applications.length > 0;

                    this.$nextTick(function () {
                        $('#multi-colum-dt').DataTable({
                            "order": [[ 0, 'desc' ]]
                        });
                    });
                }).catch(
                error => {

                });
        },
    },
    mounted() {
        this.getFCDApplications();

        var dT = $('#multi-colum-dt').DataTable();
        dT.destroy();
    }
});

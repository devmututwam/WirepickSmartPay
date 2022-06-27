// Select2 Vue Implementation wrapper

Vue.component('select2', {
    props: ['value'],
    data() {
        return {
            config: {
                placeholder: 'Select a commodity code',
                maximumInputLength: 2,
                allowClear: true,
                ajax: {
                    url: function (params) {
                        return $("input[name=Root]").val()+'/api/workflowReference/tariff/chapter/' +params.term + '/codes';
                    },
                    dataType: 'json',
                    delay: 250,
                    processResults: function (response) {
                        const data = $.map(response.payload, (obj, index) => {
                            let newArr = [];
                            newArr.push({id: obj, text: obj});

                            return newArr;
                        });
                        return {
                            results: data
                        };
                    },
                    cache: true
                },
            }
        }
    },
    template: `
        <select>
            <slot></slot>
        </select>
    `,
    mounted() {
        const vm = this;
        $(this.$el)
            // init select2
            // TODO make ajax request to pull hscode
            .select2(this.config)
            .val(this.value)
            .trigger('change')
            // emit event on change
            .on('change', () => {
                // Change here
                vm.$emit('update-hs', document.querySelector("#commodityCode").value);
            });
    },
    watch: {
        value: (value) => {
            // update value
            $(this.$el)
                .val(value)
                .trigger('change');
        },
        options: (options) => {
            // update options
            $(this.$el)
                .empty()
                .select2(this.config);
        }
    },
    destroyed() {
        $(this.$el)
            .off()
            .select2('destroy');
    }
})
let vueApp = new Vue({
                         el: "#vueApp",
                         data: {
                             notifications: [],
                             notificationCount: 0,
                             errorMessage: null,
                             filter: 'all',
                             page: 1,
                             limit: 10,
                             readMode: false,
                             mail: {
                                 subject: null,
                                 date: null,
                                 content: null,
                                 attachment: null
                             },
                             listActive: {
                                 inbox: true,
                                 read: false,
                                 unread: false,
                                 trash: false
                             },
                             checkedMails: []
                         },
                         computed: {
                             inboxMessages() {
                                 return this.notifications.filter((notification) => {
                                     return notification.status !== 'DELETED';
                                 });
                             },
                             readMessages() {
                                 return this.notifications.filter((notification) => {
                                     return notification.status === 'READ';
                                 });
                             },
                             unReadMessages() {
                                 return this.notifications.filter((notification) => {
                                     return notification.status === 'UN_READ';
                                 });
                             },
                             deletedMessages() {
                                 return this.notifications.filter((notification) => {
                                     return notification.status === 'DELETED';
                                 });
                             },
                             viewList() {
                                 return (
                                     this.filter === 'all' ? this.inboxMessages :
                                         this.filter === 'read' ? this.readMessages :
                                             (this.filter === 'unread') ? this.unReadMessages :
                                                 (this.filter === 'deleted') ? this.deletedMessages :
                                                     this.notifications);
                             }
                         },
                         methods: {

                             openUnRead() {
                                 this.updateFilters('unread');
                                 this.listActive.inbox = false;
                                 this.listActive.unread = true;
                                 this.listActive.read = false;
                                 this.listActive.trash = false;
                             },

                             openRead() {
                                 this.updateFilters('read');
                                 this.listActive.inbox = false;
                                 this.listActive.unread = false;
                                 this.listActive.read = true;
                                 this.listActive.trash = false;
                             },

                             openInbox() {
                                 this.updateFilters('all');
                                 this.listActive.inbox = true;
                                 this.listActive.unread = false;
                                 this.listActive.read = false;
                                 this.listActive.trash = false;
                             },

                             openTrash() {
                                 this.updateFilters('deleted');
                                 this.listActive.inbox = false;
                                 this.listActive.unread = false;
                                 this.listActive.read = false;
                                 this.listActive.trash = true;
                             },

                             getAllUserNotifications() {
                                 axios.get('api/notifications?page=' + this.page + "&limit=" + this.limit).then((response) => {
                                     this.notifications = response.data.data;
                                     this.getCountOfNewNotifications();
                                     this.$nextTick(function () {
                                         $('#notificationsTable').DataTable({
                                                                                "searching": true,
                                                                                "ordering": true,
                                                                                "autoWidth": false
                                                                            });
                                     })

                                 }).catch(error => this.errorMessage = error.message);
                             },

                             getUnReadNotification() {
                                 axios.get('api/notifications/unread?page=' + this.page + "&limit=" + this.limit).then((response) => {
                                     this.notifications = response.data.data;
                                     this.getCountOfNewNotifications();
                                     this.$nextTick(function () {
                                         $('#notificationsTable').DataTable({
                                                                                "searching": true,
                                                                                "ordering": true,
                                                                                "autoWidth": false
                                                                            });
                                     })

                                 }).catch(error => this.errorMessage = error.message);
                             },

                             getCountOfNewNotifications() {
                                 let UnreadNotifications = this.notifications.filter((notification) => {
                                     return notification.status === 'UN_READ';
                                 });

                                 this.notificationCount = UnreadNotifications.length;
                             },

                             openMessage(message) {
                                 this.readMode = true;
                                 this.mail.subject = message.subject;
                                 this.mail.date = message.createdDate;
                                 this.mail.content = message.message;
                                 this.markMessageAsRead(message);
                             },

                             updateFilters(value) {
                                 this.filter = value;
                                 this.readMode = false;
                             },

                             markMessageAsRead(notification) {
                                 notification.read = true;
                                 this.getCountOfNewNotifications();
                                 let notificationId = notification.id || 1;
                                 axios.post('api/notifications/mark-as-read/' + notificationId)
                                      .then((response) => {
                                          console.log(response);
                                      }).catch(error => this.errorMessage = error.message);
                             },

                             deleteMessage() {
                                 let notificationIdArray = this.checkedMails || [];
                                 axios.post('api/notifications/delete', notificationIdArray)
                                      .then((response) => {
                                          console.log(response);
                                          vueApp.notifications.map(function (object, index) {
                                              for (let i = 0; i < notificationIdArray.length; i++) {
                                                  if (object.id === notificationIdArray[i]) {
                                                      object.status = 'DELETED';
                                                  }
                                              }
                                          });
                                          vueApp.updateFilters('all');
                                          vueApp.getCountOfNewNotifications();
                                      }).catch(error => this.errorMessage = error.message);
                             }
                         },
                         filters: {
                             formatDate(value) {
                                 return new Date(value).toLocaleString();
                             }
                         },
                         mounted() {
                             this.getAllUserNotifications();
                         }
                     });
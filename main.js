const router = new VueRouter({
    routes: [
        {
            path: '/', component: dashboardComponent,
            name: 'dashboard'
        },
        {
            path: '/bill-pays', component: billPayComponent,
            children: [
                { path: '',
                    component: billPayListComponent,
                    name: 'bill-pay.list'
                },
                { path: 'create',
                    component: billPayCreateComponent,
                    name: 'bill-pay.create'
                },
                { path: ':id/update',
                    component: billPayCreateComponent,
                    name: 'bill-pay.update'
                }
            ]
        },
        {
            path: '/bill-receives', component: billReceiveComponent,
            children: [
                { path: '',
                    component: billReceiveListComponent,
                    name: 'bill-receive'
                },
                { path: 'create',
                    component: billReceiveCreateComponent,
                    name: 'bill-receive.create'
                },
                { path: ':id/update',
                    component: billReceiveCreateComponent,
                    name: 'bill-receive.update'
                }
            ]
        },
        { path: '*',
            redirect: '/'
        }
    ]
});

const app = new Vue({
    router: router,
    components: {
        'bill-component': billComponent
    }
}).$mount('#app');
import Vue from 'vue';
import Loading from './Loading.vue';

function create(Component, props) {
    const vm = new Vue({
        render: h => {
            return h(Component, { props })
        }
    }).$mount();
    document.body.appendChild(vm.$el);
    document.body.style.overflowY = "hidden";
    const comp = vm.$children[0];
    comp.remove = function () {
        document.body.removeChild(vm.$el);
        document.body.style.overflowY = "auto";
        vm.$destroy();
    }
    return comp;
}

export default {
    install(Vue) {
        Vue.prototype.$loading = function (options) {
            return create(Loading, options)
        }
    }
};
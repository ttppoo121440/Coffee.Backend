import Vue from 'vue';
// this.$registerModule(store,{moduleName:module})
Vue.prototype.$registerModule = (store, modules) => {
  Object.keys(modules).forEach((name) => {
    const isRegistered = store._modules.root._children[name] !== undefined;
    if (!isRegistered) {
      const preserveState = store.state[name];
      store.registerModule(name, modules[name], {
        preserveState,
      });
    }
  });
};

// this.$unregisterModule(store,[moduleName])
Vue.prototype.$unregisterModule = (store, modules) => {
  modules.forEach((name) => {
    const isRegistered = store._modules.root._children[name] !== undefined;
    if (isRegistered) {
      store.unregisterModule(name);
    }
  });
};

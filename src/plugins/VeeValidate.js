import Vue from 'vue';
import {
  localize,
  extend, ValidationProvider, ValidationObserver,
} from 'vee-validate';
import tw from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';

Object.keys(rules).map((rule) => extend(rule, rules[rule]));

localize('zh_TW', tw);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

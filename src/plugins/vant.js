import Vue from 'vue';

import {
  Button,
  Popup,
  Checkbox,
  CheckboxGroup,
  Switch,
  Tabs,
  Tab,
  NavBar,
  Form,
  Field,
  Toast,
  Notify 
} from 'vant';

Vue.use(Button)
.use(Popup)
.use(Checkbox)
.use(CheckboxGroup)
.use(Switch)
.use(Tabs)
.use(Tab)
.use(NavBar)
.use(Form)
.use(Field)

Vue.prototype.$toast = Toast
Vue.prototype.$notify = Notify 
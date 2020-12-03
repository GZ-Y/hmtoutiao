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
  Notify,
  CountDown,
  Tabbar,
  TabbarItem,
  Image as VanImage,
  Grid,
  GridItem,
  Cell,
  CellGroup,
  Dialog,
  Search,
  List,
  PullRefresh,
  Icon,
  ImagePreview 
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
.use(CountDown)
.use(Tabbar)
.use(TabbarItem)
.use(VanImage)
.use(Grid)
.use(GridItem)
.use(Cell)
.use(CellGroup)
.use(Search)
.use(List)
.use(PullRefresh)
.use(Icon)
.use(ImagePreview)
Vue.prototype.$toast = Toast
Vue.prototype.$notify = Notify 
Vue.prototype.$dialog = Dialog 


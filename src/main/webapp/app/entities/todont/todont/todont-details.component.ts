import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITodont } from '@/shared/model/todont/todont.model';
import TodontService from './todont.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class TodontDetails extends Vue {
  @Inject('todontService') private todontService: () => TodontService;
  @Inject('alertService') private alertService: () => AlertService;

  public todont: ITodont = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.todontId) {
        vm.retrieveTodont(to.params.todontId);
      }
    });
  }

  public retrieveTodont(todontId) {
    this.todontService()
      .find(todontId)
      .then(res => {
        this.todont = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

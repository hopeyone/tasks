import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITodontGroup } from '@/shared/model/todont/todont-group.model';
import TodontGroupService from './todont-group.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class TodontGroupDetails extends Vue {
  @Inject('todontGroupService') private todontGroupService: () => TodontGroupService;
  @Inject('alertService') private alertService: () => AlertService;

  public todontGroup: ITodontGroup = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.todontGroupId) {
        vm.retrieveTodontGroup(to.params.todontGroupId);
      }
    });
  }

  public retrieveTodontGroup(todontGroupId) {
    this.todontGroupService()
      .find(todontGroupId)
      .then(res => {
        this.todontGroup = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITodoGroup } from '@/shared/model/todo/todo-group.model';
import TodoGroupService from './todo-group.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class TodoGroupDetails extends Vue {
  @Inject('todoGroupService') private todoGroupService: () => TodoGroupService;
  @Inject('alertService') private alertService: () => AlertService;

  public todoGroup: ITodoGroup = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.todoGroupId) {
        vm.retrieveTodoGroup(to.params.todoGroupId);
      }
    });
  }

  public retrieveTodoGroup(todoGroupId) {
    this.todoGroupService()
      .find(todoGroupId)
      .then(res => {
        this.todoGroup = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

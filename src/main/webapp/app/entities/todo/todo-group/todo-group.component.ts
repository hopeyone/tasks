import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ITodoGroup } from '@/shared/model/todo/todo-group.model';

import TodoGroupService from './todo-group.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class TodoGroup extends Vue {
  @Inject('todoGroupService') private todoGroupService: () => TodoGroupService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public todoGroups: ITodoGroup[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllTodoGroups();
  }

  public clear(): void {
    this.retrieveAllTodoGroups();
  }

  public retrieveAllTodoGroups(): void {
    this.isFetching = true;
    this.todoGroupService()
      .retrieve()
      .then(
        res => {
          this.todoGroups = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: ITodoGroup): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeTodoGroup(): void {
    this.todoGroupService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('todoApp.todoTodoGroup.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllTodoGroups();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ITodontGroup } from '@/shared/model/todont/todont-group.model';

import TodontGroupService from './todont-group.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class TodontGroup extends Vue {
  @Inject('todontGroupService') private todontGroupService: () => TodontGroupService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public todontGroups: ITodontGroup[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllTodontGroups();
  }

  public clear(): void {
    this.retrieveAllTodontGroups();
  }

  public retrieveAllTodontGroups(): void {
    this.isFetching = true;
    this.todontGroupService()
      .retrieve()
      .then(
        res => {
          this.todontGroups = res.data;
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

  public prepareRemove(instance: ITodontGroup): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeTodontGroup(): void {
    this.todontGroupService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('todontApp.todontTodontGroup.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllTodontGroups();
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

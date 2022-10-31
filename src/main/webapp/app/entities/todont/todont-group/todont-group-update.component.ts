import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import TodontService from '@/entities/todont/todont/todont.service';
import { ITodont } from '@/shared/model/todont/todont.model';

import { ITodontGroup, TodontGroup } from '@/shared/model/todont/todont-group.model';
import TodontGroupService from './todont-group.service';

const validations: any = {
  todontGroup: {
    name: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class TodontGroupUpdate extends Vue {
  @Inject('todontGroupService') private todontGroupService: () => TodontGroupService;
  @Inject('alertService') private alertService: () => AlertService;

  public todontGroup: ITodontGroup = new TodontGroup();

  @Inject('todontService') private todontService: () => TodontService;

  public todonts: ITodont[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.todontGroupId) {
        vm.retrieveTodontGroup(to.params.todontGroupId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.todontGroup.id) {
      this.todontGroupService()
        .update(this.todontGroup)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('todontApp.todontTodontGroup.updated', { param: param.id });
          return (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.todontGroupService()
        .create(this.todontGroup)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('todontApp.todontTodontGroup.created', { param: param.id });
          (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveTodontGroup(todontGroupId): void {
    this.todontGroupService()
      .find(todontGroupId)
      .then(res => {
        this.todontGroup = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.todontService()
      .retrieve()
      .then(res => {
        this.todonts = res.data;
      });
  }
}

import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import TodontGroupService from '@/entities/todont/todont-group/todont-group.service';
import { ITodontGroup } from '@/shared/model/todont/todont-group.model';

import { ITodont, Todont } from '@/shared/model/todont/todont.model';
import TodontService from './todont.service';

const validations: any = {
  todont: {
    title: {
      required,
    },
    description: {},
    due: {},
  },
};

@Component({
  validations,
})
export default class TodontUpdate extends Vue {
  @Inject('todontService') private todontService: () => TodontService;
  @Inject('alertService') private alertService: () => AlertService;

  public todont: ITodont = new Todont();

  @Inject('todontGroupService') private todontGroupService: () => TodontGroupService;

  public todontGroups: ITodontGroup[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.todontId) {
        vm.retrieveTodont(to.params.todontId);
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
    if (this.todont.id) {
      this.todontService()
        .update(this.todont)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('todontApp.todontTodont.updated', { param: param.id });
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
      this.todontService()
        .create(this.todont)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('todontApp.todontTodont.created', { param: param.id });
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

  public retrieveTodont(todontId): void {
    this.todontService()
      .find(todontId)
      .then(res => {
        this.todont = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.todontGroupService()
      .retrieve()
      .then(res => {
        this.todontGroups = res.data;
      });
  }
}

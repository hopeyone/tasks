import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import TodoService from '@/entities/todo/todo/todo.service';
import { ITodo } from '@/shared/model/todo/todo.model';

import { ITodoGroup, TodoGroup } from '@/shared/model/todo/todo-group.model';
import TodoGroupService from './todo-group.service';

const validations: any = {
  todoGroup: {
    name: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class TodoGroupUpdate extends Vue {
  @Inject('todoGroupService') private todoGroupService: () => TodoGroupService;
  @Inject('alertService') private alertService: () => AlertService;

  public todoGroup: ITodoGroup = new TodoGroup();

  @Inject('todoService') private todoService: () => TodoService;

  public todos: ITodo[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.todoGroupId) {
        vm.retrieveTodoGroup(to.params.todoGroupId);
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
    if (this.todoGroup.id) {
      this.todoGroupService()
        .update(this.todoGroup)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('todoApp.todoTodoGroup.updated', { param: param.id });
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
      this.todoGroupService()
        .create(this.todoGroup)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('todoApp.todoTodoGroup.created', { param: param.id });
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

  public retrieveTodoGroup(todoGroupId): void {
    this.todoGroupService()
      .find(todoGroupId)
      .then(res => {
        this.todoGroup = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.todoService()
      .retrieve()
      .then(res => {
        this.todos = res.data;
      });
  }
}

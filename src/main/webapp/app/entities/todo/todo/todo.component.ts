import { mixins } from 'vue-class-component';
import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ITodo } from '@/shared/model/todo/todo.model';

import JhiDataUtils from '@/shared/data/data-utils.service';

import TodoService from './todo.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Todo extends mixins(JhiDataUtils) {
  @Inject('todoService') private todoService: () => TodoService;
  @Inject('alertService') private alertService: () => AlertService;

  public currentSearch = '';
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public infiniteId = +new Date();
  public links = {};

  public todos: ITodo[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllTodos();
  }

  public search(query): void {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.retrieveAllTodos();
  }

  public clear(): void {
    this.currentSearch = '';
    this.page = 1;
    this.links = {};
    this.infiniteId += 1;
    this.todos = [];
    this.retrieveAllTodos();
  }

  public reset(): void {
    this.page = 1;
    this.infiniteId += 1;
    this.todos = [];
    this.retrieveAllTodos();
  }

  public retrieveAllTodos(): void {
    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    if (this.currentSearch) {
      this.todoService()
        .search(this.currentSearch, paginationQuery)
        .then(
          res => {
            if (res.data && res.data.length > 0) {
              for (let i = 0; i < res.data.length; i++) {
                this.todos.push(res.data[i]);
              }
              if (res.headers && res.headers['link']) {
                this.links = this.parseLinks(res.headers['link']);
              }
            }
            this.totalItems = Number(res.headers['x-total-count']);
            this.queryCount = this.totalItems;
            this.isFetching = false;
            if (<any>this.$refs.infiniteLoading) {
              (<any>this.$refs.infiniteLoading).stateChanger.loaded();
              if (JSON.stringify(this.links) !== JSON.stringify({}) && this.page > this.links['last']) {
                (<any>this.$refs.infiniteLoading).stateChanger.complete();
              }
            }
          },
          err => {
            this.isFetching = false;
            this.alertService().showHttpError(this, err.response);
          }
        );
      return;
    }
    this.todoService()
      .retrieve(paginationQuery)
      .then(
        res => {
          if (res.data && res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.todos.push(res.data[i]);
            }
            if (res.headers && res.headers['link']) {
              this.links = this.parseLinks(res.headers['link']);
            }
          }
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
          if (<any>this.$refs.infiniteLoading) {
            (<any>this.$refs.infiniteLoading).stateChanger.loaded();
            if (JSON.stringify(this.links) !== JSON.stringify({}) && this.page > this.links['last']) {
              (<any>this.$refs.infiniteLoading).stateChanger.complete();
            }
          }
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

  public prepareRemove(instance: ITodo): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeTodo(): void {
    this.todoService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('todoApp.todoTodo.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.reset();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public loadMore($state): void {
    if (!this.isFetching) {
      this.page++;
      this.transition();
    }
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'desc' : 'asc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllTodos();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.reset();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}

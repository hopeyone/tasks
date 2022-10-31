/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import TodoGroupUpdateComponent from '@/entities/todo/todo-group/todo-group-update.vue';
import TodoGroupClass from '@/entities/todo/todo-group/todo-group-update.component';
import TodoGroupService from '@/entities/todo/todo-group/todo-group.service';

import TodoService from '@/entities/todo/todo/todo.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.use(ToastPlugin);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('TodoGroup Management Update Component', () => {
    let wrapper: Wrapper<TodoGroupClass>;
    let comp: TodoGroupClass;
    let todoGroupServiceStub: SinonStubbedInstance<TodoGroupService>;

    beforeEach(() => {
      todoGroupServiceStub = sinon.createStubInstance<TodoGroupService>(TodoGroupService);

      wrapper = shallowMount<TodoGroupClass>(TodoGroupUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          todoGroupService: () => todoGroupServiceStub,
          alertService: () => new AlertService(),

          todoService: () =>
            sinon.createStubInstance<TodoService>(TodoService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.todoGroup = entity;
        todoGroupServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(todoGroupServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.todoGroup = entity;
        todoGroupServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(todoGroupServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundTodoGroup = { id: 123 };
        todoGroupServiceStub.find.resolves(foundTodoGroup);
        todoGroupServiceStub.retrieve.resolves([foundTodoGroup]);

        // WHEN
        comp.beforeRouteEnter({ params: { todoGroupId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.todoGroup).toBe(foundTodoGroup);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});

/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import TodoGroupDetailComponent from '@/entities/todo/todo-group/todo-group-details.vue';
import TodoGroupClass from '@/entities/todo/todo-group/todo-group-details.component';
import TodoGroupService from '@/entities/todo/todo-group/todo-group.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('TodoGroup Management Detail Component', () => {
    let wrapper: Wrapper<TodoGroupClass>;
    let comp: TodoGroupClass;
    let todoGroupServiceStub: SinonStubbedInstance<TodoGroupService>;

    beforeEach(() => {
      todoGroupServiceStub = sinon.createStubInstance<TodoGroupService>(TodoGroupService);

      wrapper = shallowMount<TodoGroupClass>(TodoGroupDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { todoGroupService: () => todoGroupServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundTodoGroup = { id: 123 };
        todoGroupServiceStub.find.resolves(foundTodoGroup);

        // WHEN
        comp.retrieveTodoGroup(123);
        await comp.$nextTick();

        // THEN
        expect(comp.todoGroup).toBe(foundTodoGroup);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundTodoGroup = { id: 123 };
        todoGroupServiceStub.find.resolves(foundTodoGroup);

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

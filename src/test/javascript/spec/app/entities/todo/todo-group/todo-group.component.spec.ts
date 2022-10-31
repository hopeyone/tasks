/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import TodoGroupComponent from '@/entities/todo/todo-group/todo-group.vue';
import TodoGroupClass from '@/entities/todo/todo-group/todo-group.component';
import TodoGroupService from '@/entities/todo/todo-group/todo-group.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('TodoGroup Management Component', () => {
    let wrapper: Wrapper<TodoGroupClass>;
    let comp: TodoGroupClass;
    let todoGroupServiceStub: SinonStubbedInstance<TodoGroupService>;

    beforeEach(() => {
      todoGroupServiceStub = sinon.createStubInstance<TodoGroupService>(TodoGroupService);
      todoGroupServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<TodoGroupClass>(TodoGroupComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          todoGroupService: () => todoGroupServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      todoGroupServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllTodoGroups();
      await comp.$nextTick();

      // THEN
      expect(todoGroupServiceStub.retrieve.called).toBeTruthy();
      expect(comp.todoGroups[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      todoGroupServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(todoGroupServiceStub.retrieve.callCount).toEqual(1);

      comp.removeTodoGroup();
      await comp.$nextTick();

      // THEN
      expect(todoGroupServiceStub.delete.called).toBeTruthy();
      expect(todoGroupServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});

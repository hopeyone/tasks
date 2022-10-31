/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import TodontGroupComponent from '@/entities/todont/todont-group/todont-group.vue';
import TodontGroupClass from '@/entities/todont/todont-group/todont-group.component';
import TodontGroupService from '@/entities/todont/todont-group/todont-group.service';
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
  describe('TodontGroup Management Component', () => {
    let wrapper: Wrapper<TodontGroupClass>;
    let comp: TodontGroupClass;
    let todontGroupServiceStub: SinonStubbedInstance<TodontGroupService>;

    beforeEach(() => {
      todontGroupServiceStub = sinon.createStubInstance<TodontGroupService>(TodontGroupService);
      todontGroupServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<TodontGroupClass>(TodontGroupComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          todontGroupService: () => todontGroupServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      todontGroupServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllTodontGroups();
      await comp.$nextTick();

      // THEN
      expect(todontGroupServiceStub.retrieve.called).toBeTruthy();
      expect(comp.todontGroups[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      todontGroupServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(todontGroupServiceStub.retrieve.callCount).toEqual(1);

      comp.removeTodontGroup();
      await comp.$nextTick();

      // THEN
      expect(todontGroupServiceStub.delete.called).toBeTruthy();
      expect(todontGroupServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});

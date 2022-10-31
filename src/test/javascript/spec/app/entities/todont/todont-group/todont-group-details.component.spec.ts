/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import TodontGroupDetailComponent from '@/entities/todont/todont-group/todont-group-details.vue';
import TodontGroupClass from '@/entities/todont/todont-group/todont-group-details.component';
import TodontGroupService from '@/entities/todont/todont-group/todont-group.service';
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
  describe('TodontGroup Management Detail Component', () => {
    let wrapper: Wrapper<TodontGroupClass>;
    let comp: TodontGroupClass;
    let todontGroupServiceStub: SinonStubbedInstance<TodontGroupService>;

    beforeEach(() => {
      todontGroupServiceStub = sinon.createStubInstance<TodontGroupService>(TodontGroupService);

      wrapper = shallowMount<TodontGroupClass>(TodontGroupDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { todontGroupService: () => todontGroupServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundTodontGroup = { id: 123 };
        todontGroupServiceStub.find.resolves(foundTodontGroup);

        // WHEN
        comp.retrieveTodontGroup(123);
        await comp.$nextTick();

        // THEN
        expect(comp.todontGroup).toBe(foundTodontGroup);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundTodontGroup = { id: 123 };
        todontGroupServiceStub.find.resolves(foundTodontGroup);

        // WHEN
        comp.beforeRouteEnter({ params: { todontGroupId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.todontGroup).toBe(foundTodontGroup);
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

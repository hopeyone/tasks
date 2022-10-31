/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import TodontDetailComponent from '@/entities/todont/todont/todont-details.vue';
import TodontClass from '@/entities/todont/todont/todont-details.component';
import TodontService from '@/entities/todont/todont/todont.service';
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
  describe('Todont Management Detail Component', () => {
    let wrapper: Wrapper<TodontClass>;
    let comp: TodontClass;
    let todontServiceStub: SinonStubbedInstance<TodontService>;

    beforeEach(() => {
      todontServiceStub = sinon.createStubInstance<TodontService>(TodontService);

      wrapper = shallowMount<TodontClass>(TodontDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { todontService: () => todontServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundTodont = { id: 123 };
        todontServiceStub.find.resolves(foundTodont);

        // WHEN
        comp.retrieveTodont(123);
        await comp.$nextTick();

        // THEN
        expect(comp.todont).toBe(foundTodont);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundTodont = { id: 123 };
        todontServiceStub.find.resolves(foundTodont);

        // WHEN
        comp.beforeRouteEnter({ params: { todontId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.todont).toBe(foundTodont);
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

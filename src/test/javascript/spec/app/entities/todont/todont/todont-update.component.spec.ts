/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import TodontUpdateComponent from '@/entities/todont/todont/todont-update.vue';
import TodontClass from '@/entities/todont/todont/todont-update.component';
import TodontService from '@/entities/todont/todont/todont.service';

import TodontGroupService from '@/entities/todont/todont-group/todont-group.service';
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
  describe('Todont Management Update Component', () => {
    let wrapper: Wrapper<TodontClass>;
    let comp: TodontClass;
    let todontServiceStub: SinonStubbedInstance<TodontService>;

    beforeEach(() => {
      todontServiceStub = sinon.createStubInstance<TodontService>(TodontService);

      wrapper = shallowMount<TodontClass>(TodontUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          todontService: () => todontServiceStub,
          alertService: () => new AlertService(),

          todontGroupService: () =>
            sinon.createStubInstance<TodontGroupService>(TodontGroupService, {
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
        comp.todont = entity;
        todontServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(todontServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.todont = entity;
        todontServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(todontServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundTodont = { id: 123 };
        todontServiceStub.find.resolves(foundTodont);
        todontServiceStub.retrieve.resolves([foundTodont]);

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

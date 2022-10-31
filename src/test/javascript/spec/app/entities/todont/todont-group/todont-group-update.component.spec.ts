/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import TodontGroupUpdateComponent from '@/entities/todont/todont-group/todont-group-update.vue';
import TodontGroupClass from '@/entities/todont/todont-group/todont-group-update.component';
import TodontGroupService from '@/entities/todont/todont-group/todont-group.service';

import TodontService from '@/entities/todont/todont/todont.service';
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
  describe('TodontGroup Management Update Component', () => {
    let wrapper: Wrapper<TodontGroupClass>;
    let comp: TodontGroupClass;
    let todontGroupServiceStub: SinonStubbedInstance<TodontGroupService>;

    beforeEach(() => {
      todontGroupServiceStub = sinon.createStubInstance<TodontGroupService>(TodontGroupService);

      wrapper = shallowMount<TodontGroupClass>(TodontGroupUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          todontGroupService: () => todontGroupServiceStub,
          alertService: () => new AlertService(),

          todontService: () =>
            sinon.createStubInstance<TodontService>(TodontService, {
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
        comp.todontGroup = entity;
        todontGroupServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(todontGroupServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.todontGroup = entity;
        todontGroupServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(todontGroupServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundTodontGroup = { id: 123 };
        todontGroupServiceStub.find.resolves(foundTodontGroup);
        todontGroupServiceStub.retrieve.resolves([foundTodontGroup]);

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

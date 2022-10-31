import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

const Todo = () => import('@/entities/todo/todo/todo.vue');
const TodoUpdate = () => import('@/entities/todo/todo/todo-update.vue');
const TodoDetails = () => import('@/entities/todo/todo/todo-details.vue');

const TodoGroup = () => import('@/entities/todo/todo-group/todo-group.vue');
const TodoGroupUpdate = () => import('@/entities/todo/todo-group/todo-group-update.vue');
const TodoGroupDetails = () => import('@/entities/todo/todo-group/todo-group-details.vue');

const Todont = () => import('@/entities/todont/todont/todont.vue');
const TodontUpdate = () => import('@/entities/todont/todont/todont-update.vue');
const TodontDetails = () => import('@/entities/todont/todont/todont-details.vue');

const TodontGroup = () => import('@/entities/todont/todont-group/todont-group.vue');
const TodontGroupUpdate = () => import('@/entities/todont/todont-group/todont-group-update.vue');
const TodontGroupDetails = () => import('@/entities/todont/todont-group/todont-group-details.vue');

// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'todo',
      name: 'Todo',
      component: Todo,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'todo/new',
      name: 'TodoCreate',
      component: TodoUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'todo/:todoId/edit',
      name: 'TodoEdit',
      component: TodoUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'todo/:todoId/view',
      name: 'TodoView',
      component: TodoDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'todo-group',
      name: 'TodoGroup',
      component: TodoGroup,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'todo-group/new',
      name: 'TodoGroupCreate',
      component: TodoGroupUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'todo-group/:todoGroupId/edit',
      name: 'TodoGroupEdit',
      component: TodoGroupUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'todo-group/:todoGroupId/view',
      name: 'TodoGroupView',
      component: TodoGroupDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'todont',
      name: 'Todont',
      component: Todont,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'todont/new',
      name: 'TodontCreate',
      component: TodontUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'todont/:todontId/edit',
      name: 'TodontEdit',
      component: TodontUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'todont/:todontId/view',
      name: 'TodontView',
      component: TodontDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'todont-group',
      name: 'TodontGroup',
      component: TodontGroup,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'todont-group/new',
      name: 'TodontGroupCreate',
      component: TodontGroupUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'todont-group/:todontGroupId/edit',
      name: 'TodontGroupEdit',
      component: TodontGroupUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'todont-group/:todontGroupId/view',
      name: 'TodontGroupView',
      component: TodontGroupDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};

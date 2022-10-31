import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import TodoService from './todo/todo/todo.service';
import TodoGroupService from './todo/todo-group/todo-group.service';
import TodontService from './todont/todont/todont.service';
import TodontGroupService from './todont/todont-group/todont-group.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('todoService') private todoService = () => new TodoService();
  @Provide('todoGroupService') private todoGroupService = () => new TodoGroupService();
  @Provide('todontService') private todontService = () => new TodontService();
  @Provide('todontGroupService') private todontGroupService = () => new TodontGroupService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}

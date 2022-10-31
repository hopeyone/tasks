<template>
  <div>
    <b-dropdown-item to="/todo">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.todoTodo')">Todo</span>
    </b-dropdown-item>
    <b-dropdown-item to="/todo-group">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.todoTodoGroup')">Todo Group</span>
    </b-dropdown-item>
    <b-dropdown-item to="/todont">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.todontTodont')">Todont</span>
    </b-dropdown-item>
    <b-dropdown-item to="/todont-group">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.todontTodontGroup')">Todont Group</span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>

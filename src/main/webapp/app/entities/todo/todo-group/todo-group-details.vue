<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="todoGroup">
        <h2 class="jh-entity-heading" data-cy="todoGroupDetailsHeading">
          <span v-text="$t('tasksApp.todoTodoGroup.detail.title')">TodoGroup</span> {{ todoGroup.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('tasksApp.todoTodoGroup.name')">Name</span>
          </dt>
          <dd>
            <span>{{ todoGroup.name }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="todoGroup.id"
          :to="{ name: 'TodoGroupEdit', params: { todoGroupId: todoGroup.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./todo-group-details.component.ts"></script>

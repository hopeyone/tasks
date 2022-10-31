<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="tasksApp.todoTodo.home.createOrEditLabel"
          data-cy="TodoCreateUpdateHeading"
          v-text="$t('tasksApp.todoTodo.home.createOrEditLabel')"
        >
          Create or edit a Todo
        </h2>
        <div>
          <div class="form-group" v-if="todo.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="todo.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('tasksApp.todoTodo.title')" for="todo-title">Title</label>
            <input
              type="text"
              class="form-control"
              name="title"
              id="todo-title"
              data-cy="title"
              :class="{ valid: !$v.todo.title.$invalid, invalid: $v.todo.title.$invalid }"
              v-model="$v.todo.title.$model"
              required
            />
            <div v-if="$v.todo.title.$anyDirty && $v.todo.title.$invalid">
              <small class="form-text text-danger" v-if="!$v.todo.title.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('tasksApp.todoTodo.description')" for="todo-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="todo-description"
              data-cy="description"
              :class="{ valid: !$v.todo.description.$invalid, invalid: $v.todo.description.$invalid }"
              v-model="$v.todo.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('tasksApp.todoTodo.due')" for="todo-due">Due</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="todo-due"
                  v-model="$v.todo.due.$model"
                  name="due"
                  class="form-control"
                  :locale="currentLanguage"
                  button-only
                  today-button
                  reset-button
                  close-button
                >
                </b-form-datepicker>
              </b-input-group-prepend>
              <b-form-input
                id="todo-due"
                data-cy="due"
                type="text"
                class="form-control"
                name="due"
                :class="{ valid: !$v.todo.due.$invalid, invalid: $v.todo.due.$invalid }"
                v-model="$v.todo.due.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('tasksApp.todoTodo.todoGroup')" for="todo-todoGroup">Todo Group</label>
            <select class="form-control" id="todo-todoGroup" data-cy="todoGroup" name="todoGroup" v-model="todo.todoGroup">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="todo.todoGroup && todoGroupOption.id === todo.todoGroup.id ? todo.todoGroup : todoGroupOption"
                v-for="todoGroupOption in todoGroups"
                :key="todoGroupOption.id"
              >
                {{ todoGroupOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.todo.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./todo-update.component.ts"></script>

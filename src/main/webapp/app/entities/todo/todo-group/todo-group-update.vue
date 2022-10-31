<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="tasksApp.todoTodoGroup.home.createOrEditLabel"
          data-cy="TodoGroupCreateUpdateHeading"
          v-text="$t('tasksApp.todoTodoGroup.home.createOrEditLabel')"
        >
          Create or edit a TodoGroup
        </h2>
        <div>
          <div class="form-group" v-if="todoGroup.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="todoGroup.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('tasksApp.todoTodoGroup.name')" for="todo-group-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="todo-group-name"
              data-cy="name"
              :class="{ valid: !$v.todoGroup.name.$invalid, invalid: $v.todoGroup.name.$invalid }"
              v-model="$v.todoGroup.name.$model"
              required
            />
            <div v-if="$v.todoGroup.name.$anyDirty && $v.todoGroup.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.todoGroup.name.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
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
            :disabled="$v.todoGroup.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./todo-group-update.component.ts"></script>

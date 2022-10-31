<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="tasksApp.todontTodont.home.createOrEditLabel"
          data-cy="TodontCreateUpdateHeading"
          v-text="$t('tasksApp.todontTodont.home.createOrEditLabel')"
        >
          Create or edit a Todont
        </h2>
        <div>
          <div class="form-group" v-if="todont.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="todont.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('tasksApp.todontTodont.title')" for="todont-title">Title</label>
            <input
              type="text"
              class="form-control"
              name="title"
              id="todont-title"
              data-cy="title"
              :class="{ valid: !$v.todont.title.$invalid, invalid: $v.todont.title.$invalid }"
              v-model="$v.todont.title.$model"
              required
            />
            <div v-if="$v.todont.title.$anyDirty && $v.todont.title.$invalid">
              <small class="form-text text-danger" v-if="!$v.todont.title.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('tasksApp.todontTodont.description')" for="todont-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="todont-description"
              data-cy="description"
              :class="{ valid: !$v.todont.description.$invalid, invalid: $v.todont.description.$invalid }"
              v-model="$v.todont.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('tasksApp.todontTodont.due')" for="todont-due">Due</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="todont-due"
                  v-model="$v.todont.due.$model"
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
                id="todont-due"
                data-cy="due"
                type="text"
                class="form-control"
                name="due"
                :class="{ valid: !$v.todont.due.$invalid, invalid: $v.todont.due.$invalid }"
                v-model="$v.todont.due.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('tasksApp.todontTodont.todontGroup')" for="todont-todontGroup">Todont Group</label>
            <select class="form-control" id="todont-todontGroup" data-cy="todontGroup" name="todontGroup" v-model="todont.todontGroup">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="todont.todontGroup && todontGroupOption.id === todont.todontGroup.id ? todont.todontGroup : todontGroupOption"
                v-for="todontGroupOption in todontGroups"
                :key="todontGroupOption.id"
              >
                {{ todontGroupOption.id }}
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
            :disabled="$v.todont.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./todont-update.component.ts"></script>

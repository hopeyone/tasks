<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="todont">
        <h2 class="jh-entity-heading" data-cy="todontDetailsHeading">
          <span v-text="$t('tasksApp.todontTodont.detail.title')">Todont</span> {{ todont.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('tasksApp.todontTodont.title')">Title</span>
          </dt>
          <dd>
            <span>{{ todont.title }}</span>
          </dd>
          <dt>
            <span v-text="$t('tasksApp.todontTodont.description')">Description</span>
          </dt>
          <dd>
            <span>{{ todont.description }}</span>
          </dd>
          <dt>
            <span v-text="$t('tasksApp.todontTodont.due')">Due</span>
          </dt>
          <dd>
            <span>{{ todont.due }}</span>
          </dd>
          <dt>
            <span v-text="$t('tasksApp.todontTodont.todontGroup')">Todont Group</span>
          </dt>
          <dd>
            <div v-if="todont.todontGroup">
              <router-link :to="{ name: 'TodontGroupView', params: { todontGroupId: todont.todontGroup.id } }">{{
                todont.todontGroup.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="todont.id" :to="{ name: 'TodontEdit', params: { todontId: todont.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./todont-details.component.ts"></script>

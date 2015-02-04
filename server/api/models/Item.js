/**
 * Item.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    thumb: {
      type: 'string'
    },

    title: {
      type: 'string',
      required: true
    },

    score: {
      type: 'integer',
      required: true,
      min: 1,
      max: 5
    }
  }
};
import Component from 'can/component/component';
import template from './list.stache!';
import Restaurant from 'app/models/restaurant';
import BaseViewModel from 'app/viewmodel';

const cities = {
  MI: ['Detroit', 'Ann Arbor'],
  IL: ['Chicago', 'Peoria'],
  WI: ['Milwaukee', 'Green Bay']
};

export const ViewModel = BaseViewModel.extend({
  define: {
    state: {
      value: null,
      set(value) {
        // Remove the city when the state changes
        this.attr('city', null);
        return value;
      }
    },
    states: {
      value: {
        MI: 'Michigan',
        IL: 'Illinois',
        WI: 'Wisonsin'
      }
    },
    city: {
      value: null
    },
    cities: {
      get() {
        let state = this.attr('state');
        if(state) {
          return cities[state];
        }
        return [];
      }
    },
    restaurants: {
      Value: Restaurant.List,
      get: function(){
        let params = {};
        let state = this.attr('state');
        let city = this.attr('city');

        if(state && city) {
          params = {
            'address.state': state,
            'address.city': city
          };

          return this.pageData("restaurants", params, Restaurant.findAll(params));
        }

        return null;
      }
    }
  }
});

export default Component.extend({
  tag: 'app-restaurant-list',
  viewModel: ViewModel,
  template
});

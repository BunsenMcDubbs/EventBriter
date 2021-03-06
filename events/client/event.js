const FORM_ID = "form.edit_event";

// TODO change into reactive variable/dictionary
function getFormData() {
  const form_data = _.object(
    _.map($(FORM_ID).serializeArray(),
      function(e) { return [e.name, e.value]; }
    )
  );

  // TODO remove this, TEMPORARY HACK copied from tickets.js
  // eventually replace when refactoring everything to use more reactive code
  const NEW_TICKET_FORM_ID = ".edit_ticket";
  form_data.tickets = _($(".edit_ticket")).chain()
  .reject(function(elem) {
    return $(elem).hasClass("new_ticket");
  })
  .map(
    function(elem) {
      return getTicketData(elem);
    }
  ).value();

  return form_data;
}

Template.edit_event.events({
  "click #open-add-ticket": function(event) {
    $('#add-ticket-modal').addClass('active');
  },
  "click .modal-back": function(event) {
    $('.modal').removeClass('active');
  },
  "submit form.edit_event": function(event, instance) {
    event.preventDefault();

    const data = getFormData();
    data.start = yyyyMMddToDate(data.start);
    data.end = yyyyMMddToDate(data.end);
    data.name = $('#event-title').text();
    console.log(data);

    // TODO make this reactive var dream work
    // data.tickets = instance.data.tickets.get();
    // TODO disable save button for existing events until edits are made

    if (this.new_event) {
      Meteor.call("insertEvent", data, function(error, result) {
        if (error) {
          console.log("error", error);
        }
        if (result) {
          Router.go("/events/"+result);
        }
      });
    } else {
      Meteor.call("updateEvent", this._id, data, function(error, result) {
        if (error) {
          console.log("error", error);
        } else {
          // TODO notify user of successful save
          console.log("successfully saved", result);
          clearNewTicketData();
        }
      });
    }
  }
});

Template.event_listing.events({
  "click #add-event-btn": function(event) {
    $('#add-event-modal').addClass('active');
  },
  "mouseover #add-event-btn": function(event) {
    $('#add-event-modal').addClass('preview');
  },
  "mouseleave #add-event-btn": function(event) {
    $('#add-event-modal').removeClass('preview');
  },
  "click .modal-back": function(event) {
    $('.modal').removeClass('active');
  },
  "submit form.edit_event": function(event, instance) {
    event.preventDefault();
    const data = getFormData();
    data.start = yyyyMMddToDate(data.start);
    data.end = yyyyMMddToDate(data.end);
    console.log(data);
    Meteor.call("insertEvent", data, function(error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {
        Router.go("/events/"+result+"/edit");
      }
    });
  }
});

Template.manage_event.helpers({
  get_orders: function() {
    // TODO implement
  },
  all_tickets: function(tickets) {
    const event = this;
    const ticket_array = _(tickets.get()).chain()
    .pluck("sold")
    .map(function(ticket_type) {
      return _(ticket_type || {}).values();
    })
    .reduce(function(memo, sub_ticket_array) {
      return memo.concat(sub_ticket_array);
    }, [])
    // TODO reimplement this to reduce repeated lookups later
    // .map(function(ticket) {
    //   const ticket_copy = _(ticket).clone();
    //   // ticket_copy.event = event;
    //   return ticket_copy;
    // })
    .value();
    return ticket_array;
  },
  get_checkins: function(checkins) {
    const checkin_arr = _(checkins).map(function(checkin, id) {
      return _(checkin).extend({id: id});
    });
    console.log(checkins, checkin_arr);
    return checkin_arr;
  }
});

Template.manage_event.events({
  "submit .js-new-checkin": function(event, instance) {
    event.preventDefault();
    const name = instance.$(".js-new-checkin > input")[0].value;
    const event_id = instance.data._id;
    Meteor.call("addNewCheckIn", event_id, name, function(err, checkin_id) {
      if (err) {
        console.log(err);
      } else {
        Router.go("event.checkin", {event_id: event_id, checkin_id: checkin_id});
      }
    });
  },
});

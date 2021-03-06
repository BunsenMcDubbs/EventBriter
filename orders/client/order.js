Template.order_edit_attendee_info.events({
  "click .js-save-attendee-info": function(event, instance){
    event.preventDefault();

    const event_id = instance.data.event_id;
    const order_id = instance.data._id;

    // reconstruct ticket objects from form data
    // get form data (one form per ticket)
    const forms = instance.$("form.edit-attendee-info");
    const attendees_info_raw = _(forms).map(function(form) {
      // TODO i'm so sorry, this code looks awful and I know it
      return _(_($(form).serializeArray()).map(
        function(e) {
          return [e.name, e.value];
        }
      )).object();
    });
    // construct array of reconstructed ticket data
    const attendees_info = _(attendees_info_raw)
    .map(function(info) {
      // TODO check that unchanged info has not changed
      // e.g. asset _id, event_id, order_id, and type have not changed
      return {
        _id: info._id,
        event: info.event_id,
        order: info.order_id,
        type: info.type,
        attendee_info: {
          name: info.name,
          email: info.email,
          phone: info.phone,
        },
      };
    });
    console.log(attendees_info);

    Meteor.call("updateOrder", event_id, order_id, attendees_info,
      function(error, success) {
        if (error) {
          console.error("Failure while updating ticket info", error);
        } else {
          console.log("successfully updated ticket info");
          // TODO give user feedback
          if (instance.data.pending) {
            Router.go("order.create.payment_info", {order_id: order_id});
          }
        }
      }
    );
  }
});

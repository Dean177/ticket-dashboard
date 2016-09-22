const { filter, head, includes, map, size } = require('lodash');

class Ticket {}
class User {}
class Widget {}

const data = {
  Ticket: {
    1: {
      assignedToId: '1',
      description: 'I TRIeD TO Use IT and iT NO WORsk',
      priority: 'Critical',
      status: 'In Progress',
      title: 'ITS BROKEN!!!!!',
    },
  },
  User: {
    1: {
      name: 'Ant',
      tickets: ['1'],
      widgets: ['1', '2']
    },
  },
  Widget: {
    1: { name: 'IssuePriorityStatistics' },
    2: { name: 'SeverityChart' },
  },
};

module.exports = {
  createTicket(assignedToId, description, priority, status, title) {
    const nextId = size(data.Ticket) + 1;

    Ticket[NextId] = { assignedToId, description, priority, status, title };
    User[assignedToId].tickets.push(nextId);

    return {
      ticketId: nextId,
      userId: assignedToId,
    };
  },

  getAllTickets() { return map(data.Ticket, ticket => ticket); },

  getTicket(id) {
    return data.Ticket[id];
  },

  getTickets(ticketIds) {
    return filter(data.Ticket, (ticket, id) => includes(ticketIds, id));
  },

  getAllUsers() { return map(data.User, user => user); },

  getUser(id) {
    return data.User[id];
  },

  getUsers(names) {
    return filter(data.User, user => includes(names, user.name));
  },

  addWidgetForUser(widgetId, userId) {
    const user =  data.User[userId];
    user.widgets.push(widgetId);
    return user;
  },

  getAllWidgets() { return map(data.Widget, w => w); },

  getWidget(id) {
    return data.Widget[id];
  },

  getWidgets(widgetIds) {
    return filter(data.Widget, (widget, id) => includes(widgetIds, id));
  },
  Ticket,
  User,
  Widget,
};

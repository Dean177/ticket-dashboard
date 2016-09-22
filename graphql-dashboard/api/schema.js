const {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');

const {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} = require('graphql-relay');

const {
  addWidgetForUser,
  createTicket,
  getAllUsers,
  getAllTickets,
  getTicket,
  getTickets,
  getUser,
  getWidget,
  getAllWidgets,
  getWidgets,
} = require('./database');

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return getUser(id);
    } else if (type === 'Ticket') {
      return getTicket(id);
    } else if (type === 'Widget') {
      return getWidget(id);
    } else if (type === 'WidgetConfiguration') {
      return getWidgetConfiguration(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Widget) {
      return WidgetType;
    } else if (obj instanceof User) {
      return UserType;
    } else if (obj instanceof Ticket) {
      return TicketType;
    }
  }
);

const WidgetType = new GraphQLObjectType({
  name: 'Widget',
  fields: {
    id: globalIdField('Widget'),
    name: { type: GraphQLString },
  },
});

const TicketType = new GraphQLObjectType({
  name: 'Ticket',
  description: 'A ticket representing a task or bug',
  fields: () => ({
    id: globalIdField('Ticket'),
    assignedToId: { type: GraphQLString },
    assignedTo: {
      type: UserType,
      resolve: ticket => getUser(ticket.assignedToId)
    },
    description: { type: GraphQLString },
    priority: { type: GraphQLString },
    status: { type: GraphQLString },
    title: { type: GraphQLString },
  }),
  interfaces: [nodeInterface],
});

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A story board user',
  fields: () => ({
    id: globalIdField('User'),
    name: {
      type: GraphQLString,
    },
    tickets: {
      type: UserToTicketConnection,
      args: connectionArgs,
      resolve: (user, args) =>
        connectionFromArray(getTickets(user.tickets), args),
    },
    widgets: {
      type: UserToWidgetConnection,
      args: connectionArgs,
      resolve: (user, args) =>
        connectionFromArray(getWidgets(user.widgets), args),
    }
  }),
  interfaces: [nodeInterface],
});

const { connectionType: UserToTicketConnection, edgeType: TicketEdge, } =
  connectionDefinitions({ nodeType: TicketType });

const { connectionType: UserToWidgetConnection, edgeType: WidgetEdge } =
  connectionDefinitions({ nodeType: WidgetType });

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    tickets: {
      type: new GraphQLList(TicketType),
      args: {},
      resolve: (root, args) => getAllTickets(),
    },
    users: {
      type: new GraphQLList(UserType),
      args: {},
      resolve: (root, args) => getAllUsers(),
    },
    widgets: {
      type: new GraphQLList(WidgetType),
      args: {},
      resolve: (root, args) => getAllWidgets(),
    },
    node: nodeField,
  }),
});

const addWidgetForUserMutation = mutationWithClientMutationId({
  name: 'AddWidgetForUser',
  inputFields: {
    widgetId: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    newWidgetEdge: {
      type: WidgetEdge,
      resolve: (payload) => {
        const widget = getWidget(payload.widgetId);
        return {
          cursor: cursorForObjectInConnection(
            getWidgets(payload.userId),
            widget
          ),
          node: widget,
        };
      },
    },
    user: {
      type: UserType,
      resolve: (payload) => getUser(payload.userId),
    },
  },
  mutateAndGetPayload: ({ widgetId, userId }) => {
    const user = addWidgetForUser(widgetId, userId);
    return {
      userId: user.id,
      widgetId: widgetId,
    };
  },
});

const createTicketMutation = mutationWithClientMutationId({
  name: 'CreateTicket',
  inputFields: {
    assignedToId: { type: new GraphQLNonNull(GraphQLID) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    priority: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    newTicketEdge: {
      type: TicketEdge,
      resolve: (payload) => getTicket(payload.ticketId),
    },
    user: {
      type: UserType,
      resolve: (payload) => getUser(payload.userId),
    }
  },
  mutateAndGetPayload: ({ assignedToId, description, priority, status, title }) => {
    const { userId, widgetId } = createTicket(assignedToId, description, priority, status, title);
    return { userId, widgetId };
  },
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addWidgetForUser: addWidgetForUserMutation,
    createTicket: createTicketMutation,
  }),
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

module.exports = {
  schema,
};

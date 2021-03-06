var set = Ember.set;

require('./serializers');
require('./debug');
require('./id_manager');

/**
  Create the default injections.
*/
Ember.onLoad('Ember.Application', function(Application) {
  Application.initializer({
    name: "epf.container",

    initialize: function(container, application) {
      // Set the container to allow for static `find` methods on model classes
      Ep.__container__ = container;

      application.register('adapter:main', application.Adapter || Ep.RestAdapter);
      application.register('session:base', application.Session || Ep.Session);
      application.register('session:child', application.ChildSession || Ep.ChildSession);
      application.register('session:main', application.DefaultSession || Ep.Session);
      application.register('id-manager:main', Ep.IdManager)
    }
  });

  Application.initializer({
    name: "epf.injections",

    initialize: function(container, application) {
      application.inject('session', 'adapter', 'adapter:main');
      application.inject('serializer', 'idManager', 'id-manager:main');
      application.inject('session', 'idManager', 'id-manager:main');
      application.inject('adapter', 'idManager', 'id-manager:main');

      application.inject('controller', 'adapter', 'adapter:main');
      application.inject('controller', 'session', 'session:main');
      application.inject('route', 'adapter', 'adapter:main');
      application.inject('route', 'session', 'session:main');
      application.inject('data-adapter', 'session', 'session:main');
    }
  });

  Application.initializer({
    name: "epf.serializers",

    initialize: function(container, application) {
      application.register('serializer:belongs-to', Ep.BelongsToSerializer);
      application.register('serializer:boolean', Ep.BooleanSerializer);
      application.register('serializer:date', Ep.DateSerializer);
      application.register('serializer:has-many', Ep.HasManySerializer);
      application.register('serializer:id', Ep.IdSerializer);
      application.register('serializer:number', Ep.NumberSerializer);
      application.register('serializer:model', Ep.ModelSerializer);
      application.register('serializer:revision', Ep.RevisionSerializer);
      application.register('serializer:string', Ep.StringSerializer);
    }
  });

  Application.initializer({
    name: "epf.mergeStrategies",

    initialize: function(container, application) {
      application.register('merge-strategy:per-field', Ep.PerField);
      application.register('merge-strategy:default', Ep.PerField);
    }
  });

  Application.initializer({
    name: "data-adapter",

    initialize: function(container, application) {
      application.register('data-adapter:main', Ep.DebugAdapter);
    }
  });
});

<?php namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Http\Kernel;
use Dingo\Api\Http\Request;
use App\Http\Controllers\Dispatcher;

/**
 * A Laravel 5's package for Api.
 *
 * @author: Marco Nuccetelli
 */
class ApiServiceProvider extends ServiceProvider {

    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;
    /**
     * This will be used to register config & view in
     * your package namespace.
     *
     * --> Replace with your package name <--
     */
//    protected $packageName = 'apinilde';

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot(Request $request, Kernel $kernel)
    {
//        $this->bootMailPlugin();
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->setupClassAliases();

        $this->registerDispatcher();
//        $this->registerException();
    }

    /**
     * Setup the class aliases.
     *
     * @return void
     */
    protected function setupClassAliases()
    {
        $aliases = [
            'nilde' => Dispatcher::class,
            'nilde.dispatcher' => Dispatcher::class
        ];

        foreach ($aliases as $key => $aliases) {
            foreach ((array) $aliases as $alias) {
                $this->app->alias($key, $alias);
            }
        }
    }

    /**
     * Register the internal dispatcher.
     *
     * @return void
     */
    public function registerDispatcher()
    {
        $this->app->singleton('nilde.dispatcher', function ($app) {
            $dispatcher = new Dispatcher($app['\Dingo\Api\Dispatcher']);
            return $dispatcher;
        });
    }

//    private function registerException()
//    {
//        $response = $this->app['api.http.response'];
//
//        $this->app['Dingo\Api\Exception\Handler']->register(function (\App\Exceptions\BulkApiException $exception) use ($response)
//        {
//            $exception_response = ['errors' => $exception->getErrors()];
//            $collection = $exception->getData();
//            if(count($collection))
//            {
//                $transformer = get_class($collection->first()->getModel())."Transformer";
//                $exception_response['data'] = json_decode($response->collection($collection, new $transformer)->getContent());
//            }
//
//            return $response->array($exception_response);
//
//        });
//
//        $this->app['Dingo\Api\Exception\Handler']->register(function (\Illuminate\Auth\Access\AuthorizationException $exception) use ($response)
//        {
//            return $response->errorUnauthorized($exception->getMessage() ?: trans('apinilde::auth.unauthorized'));
//        });
//    }

}
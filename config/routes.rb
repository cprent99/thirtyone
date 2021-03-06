Thirtyone::Application.routes.draw do

  resources :visits

  resources :user_roles

  devise_for :users

#  resources :inventory_orders

  scope 'inventory' do
    resources :items, as: 'inventory_items', controller: 'inventory_items'
    resources :orders, controller: 'inventory_orders'

    #TODO: Need to figure out what to name this
    resources :inventory_stock_records
  end

  root  'static_pages#index'

  resources :user, as: "users", controller: "users", via: :all
  resources :role, as: "roles", controller: "roles", via: :all

  match '/calendar(/:year(/:month))' => 'calendar#index',
        :as => :calendar,
        :constraints => {:year => /\d{4}/, :month => /\d{1,2}/},
        via: :all

  match '/calendar/:year/:month/:day', :controller => 'calendar', :action => 'day', via: :all

  resources :event, as: 'events', controller: 'event', via: :all

  resources :households, controller: 'household' do
    collection do
      get :search
    end
  end
  match '/calendar/:person_id', :controller => "calendar", :action => "person", via: :all

  resources :event, as: "events", controller: "event", via: :all

  resources :work_schedule, as: "work_schedules", controller: "work_schedule", via: :all

  resources :people do
    collection do
      get 'search'
    end
  end
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end

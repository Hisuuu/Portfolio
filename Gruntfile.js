module.exports = function(grunt){

  // Project configuration.
  grunt.initConfig({
  	watch:{
  		less:{
  			files: ['app/styles/*.less'],
  			tasks: ['css']
  		},
  		livereload:{
  			files:['app/index.html','.tmp/styles/*.css'],
  			options:{
  				livereload: true
  			}
  		}
  	},
  	less:{
  		dev:{
  			files:{
  				".tmp/styles/main.css":"app/styles/main.less",
          ".tmp/styles/home.css":"app/styles/home.less",
          ".tmp/styles/portfolio.css":"app/styles/portfolio.less",
          ".tmp/styles/contact.css":"app/styles/contact.less",
          ".tmp/styles/buttons.css":"app/styles/buttons.less",
          ".tmp/styles/sidebar.css":"app/styles/sidebar.less"
  			}
  		}

  	},
  	autoprefixer:{
  		dev:{
  			files:{
  				".tmp/styles/main.css":".tmp/styles/main.css"
  			}
  		}

  	},
  	connect:{
  		server:{
  			options:{
  				base:['app','.tmp'],
  				livereload: 35729
  			}
  		}
  	},
    clean:['.tmp']
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['server']);
  
  grunt.registerTask('css', ['less','autoprefixer']);
  grunt.registerTask('server', ['clean','css','connect','watch']);
}

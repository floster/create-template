module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
    	dist: {
		    options: {
		      style: 'expanded' // cssmin will minify later
		    },
		    files: {
		      'css/dev/global.css': 'css/scss/global.scss'
		    }
		  }
	  },

	  autoprefixer: {
	    options: {
		    browsers: ['last 2 version']
		  },
		  multiple_files: {
		    expand: true,
		    flatten: true,
		    src: 'css/dev/global.css',
		    dest: 'css/dev/global.pefixed.css'
		  }
		},

		cssmin: {
			combine: {
		    files: {
		      'css/global.min.css': ['css/dev/global.pefixed.css']
		    }
		  }
		},

    svgstore: {
		  options: {
		    prefix : 'shape-', // This will prefix each <g> ID
		    svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
			    style: "display:none;",
          xmlns: 'http://www.w3.org/2000/svg'
	      }
		  },
		  default : {
	      files: {
	        'images/svg-shapes.svg': ['images/svgs/*.svg']
	      }
	    }
		},

		watch: {
			svgs: {
		    files: 'images/svgs/*.svg',
		    tasks: ['svgstore'],
		    options: {
		      spawn: false,
		    }
		  },
		  css: {
		  	files: 'css/scss/*.scss',
		  	tasks: ['sass', 'autoprefixer', 'cssmin'],
		  	options: {
		  		spawn: false,
		  	}
		  }
		}

  });

  // Load the plugin that provides the "svgstore" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Launch.scss';

class Launch extends Component {

    constructor(props) {
        super(props);

        this.onClickEnterHandler = this.onClickEnterHandler.bind(this);
		this.onClickSigninHandler = this.onClickSigninHandler.bind(this);

    }

    componentDidMount() {

        var color = ['#fffda8','#f6ffaa','#f0ffba','#ececec','#ecf0f1','#a2ded0'];
        var stars = [];
        
        var initialize = function() {
            var canvas = document.getElementById('sky'),
              context = canvas.getContext('2d');
            
            canvas.width = window.innerWidth, canvas.height = window.innerHeight;

            window.addEventListener("resize", function() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });

            for(var i = 0, l = 100; i < l; i++){
                var radius = Math.random() * 1.5;
                stars.push({ 
                    'radius': radius,
                    'x': Math.random() * canvas.width,
                    'y': Math.random() * canvas.height,
                    'color': color[parseInt(Math.random()*4)],
                    'blur': Math.random() * 10,
                    'pulse': true,
                    'threshold': (radius * 1.25) 
                });
            }
            window.requestAnimationFrame(draw);
        };
        
        var generatePulseVariance = function(star, canvas){
            if(star.pulse){
                    star.radius += 0.075;			
                    star.pulse = (star.radius <= star.threshold);
                }
                else {
                    if(star.radius >= 1)
                        star.radius -= 0.075;			
                    star.pulse = (star.radius <= 1);
                }
            
            if(star.x < canvas.width)
                        star.x += 0.35;
                    else
                        star.x = 0;
            
            return star;
        };
        
        var draw = function() {
            var canvas = document.getElementById('sky'),
              context = canvas.getContext('2d');
            
            context.clearRect(0, 0, canvas.width, canvas.height);
            
            for(var i = 0, l = stars.length; i < l; i ++) {
                var star = stars[i];
                star = generatePulseVariance(star, canvas);
                
                context.beginPath();
                context.arc(star.x, star.y, star.radius, 0, 2 * Math.PI, false);
                context.fillStyle = star.color;
                    context.shadowColor = star.color;
                context.shadowBlur = star.blur;
                context.fill();
            }
            
            window.requestAnimationFrame(draw);
        };
        
        initialize();

    }
    
    onClickEnterHandler() {
		this.props.history.push('/dashboard');

    }

    onClickSigninHandler() {
		this.props.history.push('/auth');
    }

    render() {
        return (
            <div className="launch-ctn">
                <canvas id="sky"></canvas>
                <h1>
                    KaleidoSpace
                    <p>My tech blog, visit <span>
                        <a href="https://github.com/pinebrook" target="_blank">repo</a></span> for detail</p>
                </h1>
                <div className="opt-ctn">
                    <button onClick={this.onClickEnterHandler}>Enter</button>
                    <button onClick={this.onClickSigninHandler}>Sign In</button>
                </div>
            </div>
        );
    }

};

export default Launch;
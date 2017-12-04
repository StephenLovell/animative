# animative.js
## A script/library that uses anime.js to animate a sequence of SVG primitives from one to another.

See Working Demo Here: https://codepen.io/stephenlovell/pen/XzVJML

I won't lie to you, this is still a bit rough, but it works. :) I built this as both a proof of concept and to use within a project I'm working on. As such, it may not play well with others, but you're free to submit any pull requests and I'll be happy to review them.

## Use It

Include it following the example. If you use anime.js elsewhere make sure you don't use the variable 'timeline' for a sequence, that's already used here. I know, I know, I should handle this better.

You can edit the onlick functions to attach to different buttons if you like. It's just important that each button play the timeline and run the updateFrame function in the desired direction.

Presently there's no method built in to help you let it autoplay through to the end of the entire SVG sequence, but there's nothing stopping you from doing it if you dig into the anime.js docs and know your wary around js.

## Dependencies

This uses anime.js, so you'll need that. No jQuery or anything else is required.

## Roadmap

There's certainly room to make this into a proper library/package/whatever that has config options and so forth. I built this for me, for a project I'm working on, so feel free to submit a pull request if you want to add things. It was built for a specific thing so it may not play well with other libraries or projects.

I left a lot of console.log stuff enabled so I could debug. You can easily comment it out if you want. It'll get removed at some point so just don't depend on it to be there.

## Warnings

Use at your own risk, but have fun.

I haven't tested it with multiple sequences on one page. You could get that to work easily if you were to tinker with the code a bit.

Make sure all your SVGs use polygons and that each SVG in the sequence has the same number. In this example they all have 50 each. This allows the array to map shapes from one SVG to another. I'm not sure what will happen if you break this rule. Could be fun? Could be not?

## Honorable Mentions

I'd very much like to thank Michael Fogleman for his lovely primitive tool. That's what I used to make my primitives to work from. I suggest you do the same.

(http://primitive.lol)
(http://github.com/fogleman/primitive)

I'd also like to thank Nataliya Sayenko who built a menu based primitive animation example using GreenSock. That gave me the idea to try it with anime.js with some changes. Her methodology and code were vital. In fact, the first two functions in the script are pretty much the same ones she used to map the array frames.

(https://codepen.io/nsayenko/pen/BpdzOZ)

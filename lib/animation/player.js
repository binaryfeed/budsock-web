const animationPlayer = (function() {
  var st = st || {};
  st.hash = {};
  st.defineShapes = {};
  st.defineSprites = {};
  st.init = function(element, animation) {
    st.animation = animation;
    st.initRoot(element);
    st.initDefs();
    st.initShapes();
    st.interval = Math.floor(1E3 / st.animation.FrameRate)
  };
  st.createTag = function(a) {
    return document.createElementNS("http://www.w3.org/2000/svg", a)
  };
  st.initRoot = function(element) {
    var a = st.animation.FrameRect;
    st.root = st.createTag("svg");
    st.root.setAttribute("width", "100%");
    st.root.setAttribute("height", "100%");
    st.root.setAttribute("viewBox", a.xmin + " " + a.ymin + " " + st.animation.FrameWidth + " " + st.animation.FrameHeight);
    st.scene = element;
    st.scene.appendChild(st.root);
  };
  st.initDefs = function() {
    var a = st.createTag("g"),
      b = st.createTag("defs");
    a.appendChild(b);
    st.root.appendChild(a);
    st.defs = b
  };
  st.initShapes = function() {
    for (var a = st.animation.tags, b = 0, d = a.length; b < d; b++) {
      var c = a[b];
      switch (c.type) {
        case 2:
          st.processShape(c);
          break;
        case 10:
          st.processFont(c);
          break;
        case 11:
          st.processText(c);
          break;
        case 39:
          st.processSprite(c)
      }
      st.hash[c.id] = c
    }
  };
  st.processFont = function(a) {
    var b = st.createTag("font");
    b.setAttribute("id", "ft" + a.id);
    b.setAttribute("horiz-adv-x", 1024);
    var d = st.createTag("font-face");
    d.setAttribute("font-family", "ft" + a.id);
    d.setAttribute("line-height", "1.15");
    d.setAttribute("units-per-em", a.unitsperem);
    d.setAttribute("font-weight", "bold");
    b.appendChild(d);
    d = 0;
    for (var c = a.fonts.length; d < c; d++) {
      var g = a.fonts[d],
        e = st.createTag("glyph");
      e.setAttribute("d", g.data);
      e.setAttribute("unicode", g.code);
      "advance" in g && e.setAttribute("horiz-adv-x",
        g.advance);
      b.appendChild(e)
    }
    st.defs.appendChild(b)
  };
  st.processText = function(a) {
    for (var b = st.createTag("g"), d = st.createTag("defs"), c = st.createTag("g"), g = 0; a.records[g]; g++) {
      var e = a.records[g];
      if (a.texttype == "html") {
        var h = a.bound,
          m = document.createTextNode(e.text),
          f = document.createElement("span");
        f.style.fontSize = e.fontsize + "px";
        f.style.color = e.color;
        f.style.fontFamily = e.fontid;
        f.appendChild(m);
        if (g == 0) {
          text_p = document.createElement("p");
          text_div = document.createElement("div");
          text_div.style.textAlign = "left";
          text_body = document.createElement("body");
          var j =
            st.createTag("foreignObject");
          j.setAttribute("x", h.left);
          j.setAttribute("y", h.top);
          j.setAttribute("width", h.right - h.left);
          j.setAttribute("height", h.bottom - h.top);
          h = st.createTag("g");
          h.setAttribute("transform", a.transform);
          h.setAttribute("translate", e.translate);
          h.appendChild(j);
          j.appendChild(text_body);
          text_body.appendChild(text_div);
          text_div.appendChild(text_p);
          text_p.appendChild(f);
          c.appendChild(h)
        } else j.appendChild(f);
        j = f
      } else {
        f = st.createTag("text");
        if (e.psd === !0) {
          h = "";
          m = 0;
          for (var i = e.text.length; m <
            i; m++) h += "*";
          e.text = h
        }
        m = document.createTextNode(e.text);
        f.appendChild(m);
        e.bold && f.setAttribute("font-weight", "bold");
        f.setAttribute("font-size", e.height);
        e.fontid.toString().match(/\d/) ? f.setAttribute("font-family", "ft" + e.fontid) : f.setAttribute("font-family", e.fontid);
        f.setAttribute("fill", e.color);
        f.setAttribute("x", e.x);
        f.setAttribute("y", e.y);
        f.setAttribute("fill-rule", "nonzero");
        f.setAttribute("style", "white-space:pre");
        f.setAttribute("transform", a.transform);
        c.appendChild(f)
      }
    }
    b.appendChild(d);
    b.appendChild(c);
    b.setAttribute("type", "text");
    st.defineShapes[a.id] = b
  };
  st.processSprite = function(a) {
    var b = st.createTag("g"),
      d = st.createTag("defs"),
      c = st.createTag("g");
    b.setAttribute("type", "sprite");
    b.appendChild(d);
    b.appendChild(c);
    st.defineShapes[a.id] = b
  };
  st.processShape = function() {
    var a = function(a, b, g) {
        if (document.getElementById(b)) return b;
        g = st.createTag(g);
        for (var e in a) typeof a[e] == "object" || e == "type" || g.setAttribute(e, a[e]);
        a = a.stop;
        e = 0;
        for (var h = a.length; e < h; e++) {
          var m = a[e],
            f = st.createTag("stop"),
            j;
          for (j in m) f.setAttribute(j, m[j]);
          g.appendChild(f)
        }
        g.setAttribute("id", b);
        st.defs.appendChild(g);
        return b
      },
      b = function(a, b) {
        if (document.getElementById(b)) return b;
        var g = st.createTag("pattern"),
          e;
        for (e in a) typeof a[e] == "object" || e == "type" || g.setAttribute(e,
          a[e]);
        var h = st.createTag("image");
        for (e in a.image) e == "xlink:href" ? h.setAttributeNS("http://www.w3.org/1999/xlink", "href", a.image[e]) : h.setAttribute(e, a.image[e]);
        g.appendChild(h);
        g.setAttribute("id", b);
        st.defs.appendChild(g);
        return b
      };
    return function(d) {
      var c = st.createTag("g"),
        g = st.createTag("defs"),
        e = st.createTag("g");
      c.appendChild(g);
      c.appendChild(e);
      g = d.paths;
      for (var h = 0, m = g.length; h < m; h++) {
        var f = g[h],
          j = st.createTag("path");
        j.setAttribute("d", f.data);
        if (typeof f.fill !== "undefined") {
          var i = d.FillStyles[f.fill],
            k = d.id,
            n = f.fill;
          if (i) {
            var o = j,
              l = k;
            k = i.type;
            if (k == 1) o.setAttribute("fill", i.color), o.setAttribute("fill-opacity", typeof i["fill-opacity"] == "undefined" ? 1 : i["fill-opacity"]);
            else {
              n = "f" + l + ":" + n;
              l = "";
              switch (k) {
                case 2:
                  l = a(i, n, "linearGradient");
                  break;
                case 3:
                  l = a(i, n, "radialGradient");
                  break;
                case 4:
                case 5:
                case 6:
                case 7:
                  l = b(i, n)
              }
              o.setAttribute("fill", "url(#" + l + ")")
            }
          }
        }
        if (typeof f.line !== "undefined") {
          i = d.LineStyles[f.line];
          k = d.id;
          o = j;
          f = f.line;
          n = void 0;
          for (n in i) typeof i[n] != "object" && o.setAttribute(n, i[n]);
          if ("fill" in
            i) {
            f = "l" + k + ":" + f;
            k = "";
            switch (i.fill.type) {
              case 2:
                k = a(i.fill, f, "linearGradient");
                break;
              case 3:
                k = a(i.fill, f, "radialGradient");
                break;
              case 4:
              case 5:
              case 6:
              case 7:
                k = b(i.fill, f)
            }
            o.setAttribute("stroke", "url(#" + k + ")")
          }
          o.setAttribute("fill", "none")
        }
        e.appendChild(j)
      }
      c.setAttribute("type", "shape");
      st.defineShapes[d.id] = c
    }
  }();
  st.filterElement = function(a, b) {
    var d = {
        "0": "Shadow",
        "1": "Blur",
        "2": "Glow",
        "3": "Bevel"
      },
      c = function(a) {
        return a == 0 ? "SourceGraphic" : a
      };
    st.defs = a.firstChild;
    st.target = a.firstChild.nextSibling;
    st.id = "filter_" + a.getAttribute("id");
    st.base = 0;
    st.filters = b;
    st.element = st.createTag("filter");
    st.defs.appendChild(st.element);
    this.Rgb = function(a) {
      var b = ["R", "G", "B"],
        c = st.createTag("feComponentTransfer");
      c.setAttribute("in", a);
      st.element.appendChild(c);
      for (a = 0; a < b.length; a++) {
        var d = st.createTag("feFunc" +
          b[a]);
        d.setAttribute("type", "linear");
        d.setAttribute("slope", 0);
        c.appendChild(d)
      }
      return this
    };
    this.Rgba = function(a, b, c) {
      var d = ["R", "G", "B"],
        f = [b.r, b.g, b.b, b.a];
      b = st.createTag("feComponentTransfer");
      b.setAttribute("result", c);
      this.element.appendChild(b);
      for (c = 0; c < d.length; c++) {
        var j = st.createTag("feFunc" + d[c]);
        j.setAttribute("type", "linear");
        j.setAttribute("intercept", f[c]);
        b.appendChild(j)
      }
      d = st.createTag("feFuncA");
      d.setAttribute("type", "linear");
      d.setAttribute("slope", a);
      b.appendChild(d);
      return this
    };
    this.Fo = function(a, b) {
      var c = st.createTag("feOffset");
      c.setAttribute("dx", a);
      c.setAttribute("dy", b);
      this.element.appendChild(c);
      return this
    };
    this.Fg = function(a, b) {
      var c = st.createTag("feGaussianBlur");
      c.setAttribute("stdDeviation", [a, b].join(" "));
      this.element.appendChild(c);
      return this
    };
    this.Com = function(a, b, c, d) {
      var f = st.createTag("feComposite");
      f.setAttribute("in2", c);
      f.setAttribute("in", b);
      f.setAttribute("operator", a);
      f.setAttribute("result", d);
      this.element.appendChild(f);
      return this
    };
    this.Shadow =
      function(a) {
        this.Rgb(c(this.base)).Fg(a.blurx, a.blury).Fo(a.dx, a.dy).Rgba(a.strength, a.color, "shadow").Com("over", c(this.base), "shadow", ++this.base)
      };
    this.Blur = function(a) {
      var b = st.createTag("feGaussianBlur");
      b.setAttribute("in", c(this.base));
      b.setAttribute("result", ++this.base);
      b.setAttribute("stdDeviation", [a.blurx, a.blury].join(" "));
      this.element.appendChild(b)
    };
    this.Glow = function(a) {
      this.Rgb(c(this.base)).Fg(a.blurx, a.blury).Rgba(a.strength, a.color, ++this.base).Com("over", c(this.base - 1), this.base,
        ++this.base)
    };
    this.Bevel = function(a) {
      this.Rgb(c(this.base)).Fg(a.blurx, a.blury).Fo("-" + a.dx, "-" + a.dy).Rgba(a.strength, a.highlightColor, ++this.base).Rgb(c(this.base - 1)).Fg(a.blurx, a.blury).Fo(a.dx, a.dy).Rgba(a.strength, a.color, ++this.base).Com("xor", this.base, c(this.base - 1), "shadow").Com("over", "shadow", c(this.base - 2), ++this.base)
    };
    this.init = function() {
      var a = this.filters.rect,
        b = this.filters.record;
      this.element.setAttribute("width", a.w);
      this.element.setAttribute("height", a.h);
      this.element.setAttribute("x",
        a.x);
      this.element.setAttribute("y", a.y);
      this.element.setAttribute("id", this.id);
      for (a = 0; a < b.length; a++) this.filterDom(b[a]);
      this.attachFilter()
    };
    this.reset = function(a) {
      for (; this.element.firstChild;) this.element.removeChild(this.element.firstChild);
      this.base = 0;
      this.filters = a;
      this.init()
    };
    this.filterDom = function(a) {
      if (d[a.type]) this[d[a.type]](a)
    };
    this.attachFilter = function() {
      this.element.childNodes.length > 0 && this.target.setAttribute("filter", "url(#" + this.id + ")")
    };
    this.init()
  };
  st.sprite = function(a, b) {
    this.placeObjects = a.ShowFrame;
    this.sprites = {};
    this.depths = {};
    this.frame = this.arrayIndex = 0;
    this.par = b;
    this.animation = [];
    for (var d = [], c = 0; c < this.placeObjects.length; c++) {
      var g = this.placeObjects[c];
      d.push(g);
      g.type == 1 && (this.animation.push(d), d = [])
    }
  };
  st.sprite.getTagByNode = function(a) {
    a = a.getAttribute("id").split(":");
    return st.hash[a[a.length - 1]]
  };
  st.sprite.prototype.showFrame = function() {
    var a = this.animation[this.frame];
    a = a[a.length - 1];
    if ("action" in a)
      for (var b = 0; b < a.action.length; b++) this.action(a.action[b]);
    this._showFrame();
    this.pause || this.frame++;
    if (this.frame == this.animation.length) this.frame = 0
  };
  st.sprite.prototype._showFrame = function() {
    for (var a = this.animation[this.frame], b = 0, d = a.length - 1; b < d; b++) {
      var c = a[b];
      this.renderShape(c);
      this.lastDepth = c.depth
    }
    this.lastDepth = null
  };
  st.sprite.prototype.renderShape = function(a) {
    var b = null;
    if ((b = a.replace && a.replace == !0 ? this.replaceShape(a) : a.remove && a.remove == !0 ? this.removeShape(a.depth) : this.getShape(a)) && a.matrix) this.moveTag(b, a.matrix), b.getAttribute("type") == "sprite" && (this.sprites[a.depth + ":" + a.id] || (this.sprites[a.depth + ":" + a.id] = new st.sprite(st.hash[a.id], b)), this.sprites[a.depth + ":" + a.id].showFrame()), "opacity" in a ? this.changeOpacity(b, a.opacity) : this.changeOpacity(b, 1), "cxform" in a && this.colorTransform(b, a.cxform), "filters" in
      a && this.addFilters(b, a.filters)
  };
  st.sprite.prototype.replaceShape = function(a) {
    var b = this.par.firstChild.nextSibling,
      d = this.createShape(a);
    if (this.depths[a.depth]) {
      var c = this.par.getAttribute("id") + ":" + a.depth + ":" + this.depths[a.depth],
        g = document.getElementById(c);
      if (c == d.id) return g;
      b.replaceChild(d, g);
      this.sprites[a.depth + ":" + this.depths[a.depth]] && (this.sprites[a.depth + ":" + this.depths[a.depth]] = null, delete this.sprites[a.depth + ":" + this.depths[a.depth]])
    } else this.lastDepth ? (c = this.par.getAttribute("id") + ":" + this.lastDepth + ":" + this.depths[this.lastDepth],
      c = document.getElementById(c).nextSibling) : c = b.firstChild, c ? b.insertBefore(d, c) : b.appendChild(d);
    this.depths[a.depth] = a.id;
    return d
  };
  st.sprite.prototype.addFilters = function(a, b) {
    a.filter ? a.filter.reset(b) : a.filter = new st.filterElement(a, b)
  };
  st.sprite.prototype.action = function(a) {
    for (var b = 0, d = a.length; b < d; b++) switch (a[b].code) {
      case 7:
        this.stop();
        break;
      case 129:
        this.gotoFrame(a[b].frame);
        break;
      case 6:
        this.play()
    }
  };
  st.sprite.prototype.stop = function() {
    this.pause = !0
  };
  st.sprite.prototype.gotoFrame = function(a) {
    this.frame = a;
    this.pause = !0
  };
  st.sprite.prototype.play = function() {
    this.pause = !1
  };
  st.sprite.prototype.getNode = function(a) {
    return st.defineShapes[a.id].cloneNode(!0)
  };
  st.sprite.prototype.createShape = function(a) {
    var b = this.getNode(a),
      d = this.par.getAttribute("id") + ":" + a.depth + ":" + a.id;
    "clipDepth" in a ? (this.clipDepthId = d, this.clipDepth = a.clipDepth, this.clipDepthDepth = a.depth, b = this.createClip(a)) : this.clipDepthId && a.depth > this.clipDepthDepth && a.depth <= this.clipDepth && b.setAttribute("clip-path", "url(#" + this.clipDepthId + ")");
    b.setAttribute("id", d);
    return b
  };
  st.sprite.prototype.createClip = function(a) {
    var b = this.getNode(a);
    switch (b.getAttribute("type")) {
      case "shape":
        return this.createSimpleClip(b);
      case "sprite":
        return this.createComplexClip(a)
    }
  };
  st.sprite.prototype.createSimpleClip = function(a) {
    var b = st.createTag("clipPath");
    a = a.firstChild.nextSibling.childNodes;
    for (var d = 0, c = a.length; d < c; d++) {
      var g = a[d].cloneNode(!0);
      b.appendChild(g)
    }
    b.setAttribute("clippathunits", "userSpaceOnUse");
    b.setAttribute("type", "shape");
    return b
  };
  st.sprite.prototype.createComplexClip = function(a) {
    return this.createSimpleClip(st.defineShapes[st.hash[a.id].ShowFrame[0].id])
  };
  st.sprite.prototype.removeShape = function(a) {
    if (this.depths[a]) {
      var b = this.depths[a],
        d = this.par.firstChild.nextSibling;
      b = this.par.getAttribute("id") + ":" + a + ":" + b;
      b = document.getElementById(b);
      d.removeChild(b);
      this.sprites[a + ":" + this.depths[a]] && (this.sprites[a + ":" + this.depths[a]] = null, delete this.sprites[a + ":" + this.depths[a]]);
      delete this.depths[a]
    }
    return null
  };
  st.sprite.prototype.getShape = function(a) {
    a = this.par.getAttribute("id") + ":" + a.depth + ":" + a.id;
    return document.getElementById(a)
  };
  st.sprite.concatMatrix = function(a, b) {
    var d = [];
    a = a.split(",");
    b = b.split(",");
    for (var c = 0; a[c]; c++) a[c] -= 0, b[c] -= 0;
    d.push(a[0] * b[0] + a[1] * b[1]);
    d.push(a[0] * b[1] + a[1] * b[3]);
    d.push(a[1] * b[0] + a[3] * b[1]);
    d.push(a[1] * b[1] + a[3] * b[3]);
    d.push(b[4] * a[0] + b[5] * a[1] + a[4]);
    d.push(b[4] * a[1] + b[5] * a[3] + a[5]);
    return d.join(",")
  };
  st.sprite.prototype.moveTag = function(a, b) {
    switch (a.getAttribute("type")) {
      case "mask":
      case "shape":
        this.moveShape(a, b);
        break;
      case "text":
        this.moveText(a, b);
        break;
      case "sprite":
        this.moveSprite(a, b)
    }
  };
  st.sprite.prototype.moveShape = function(a, b) {
    if (a.nodeName.toLowerCase() == "g") a.firstChild.nextSibling.setAttribute("transform", "matrix(" + b + ")");
    else
      for (var d = a.childNodes, c = 0, g = d.length; c < g; c++) d[c].setAttribute("transform", "matrix(" + b + ")")
  };
  st.sprite.prototype.moveText = function(a, b) {
    for (var d = a.firstChild.nextSibling.childNodes, c = 0; d[c]; c++) {
      var g = d[c].getAttribute("transform");
      d[c].oriMx = d[c].oriMx || g;
      g = d[c].oriMx.match(/matrix\(([^(]+)\)/)[1];
      g = st.sprite.concatMatrix(g, b);
      d[c].setAttribute("transform", "matrix(" + g + ")")
    }
  };
  st.sprite.prototype.moveSprite = function(a, b) {
    a.firstChild.nextSibling.setAttribute("transform", "matrix(" + b + ")")
  };
  st.sprite.prototype.changeOpacity = function(a, b) {
    a.setAttribute("opacity", b)
  };
  st.sprite.prototype.colorTransform = function() {
    function a(a, d) {
      var c = a.match(/rgb\(([^(]+)\)/)[1].split(","),
        g = Math.max(0, Math.min((c[0] - 0) * d.RedMultTerm / 256 + d.RedAddTerm, 255)),
        e = Math.max(0, Math.min((c[1] - 0) * d.GreenMultTerm / 256 + d.GreenAddTerm, 255));
      c = Math.max(0, Math.min((c[2] - 0) * d.BlueMultTerm / 256 + d.BlueAddTerm, 255));
      g = parseInt(g);
      e = parseInt(e);
      c = parseInt(c);
      return [g, e, c]
    }
    return function(b, d) {
      var c = b.getAttribute("type");
      if ((c == "shape" || c == "text") && b.nodeName.toLowerCase() != "clippath") {
        c = b.firstChild.nextSibling;
        try {
          for (var g = 0, e = c.childNodes.length; g < e; g++) {
            var h = c.childNodes[g],
              m = d,
              f = h.hasAttribute("stroke") ? "stroke" : "fill",
              j = h.getAttribute(f);
            if (j) switch (j.match(/^\S{3}/)[0]) {
              case "rgb":
                var i = h,
                  k = f;
                i.oriC = i.oriC || j;
                var n = a(i.oriC, m);
                i.setAttribute(k, "rgb(" + n[0] + "," + n[1] + "," + n[2] + ")");
                break;
              case "url":
                i = h;
                k = f;
                var o = j.match(/url\(#([^(]+)\)/)[1],
                  l = "";
                switch (k) {
                  case "stroke":
                    l = "l";
                    break;
                  case "fill":
                    l = "f"
                }
                var t = o.indexOf(l);
                t !== 0 && (o = o.substr(t));
                var r = document.getElementById(o);
                if (r.nodeName != "pattern") {
                  var v =
                    i.parentNode.previousSibling,
                    p = i.parentNode.parentNode.getAttribute("id") + o;
                  if (document.getElementById(p)) var q = document.getElementById(p);
                  else q = r.cloneNode(!0), q.setAttribute("id", p), v.appendChild(q);
                  var u = r.childNodes,
                    w = q.childNodes;
                  l = 0;
                  for (var x = u.length; l < x; l++) {
                    var y = u[l].getAttribute("stop-color"),
                      s = a(y, m);
                    w[l].setAttribute("stop-color", "rgb(" + s[0] + "," + s[1] + "," + s[2] + ")")
                  }
                  i.setAttribute(k, "url(#" + p + ")")
                }
            }
          }
        } catch (z) {}
      } else if (c == "sprite") {
        e = b.firstChild.nextSibling.childNodes;
        h = 0;
        for (f = e.length; h <
          f; h++) this.colorTransform(e[h], d)
      }
    }
  }();
  st.start = function() {
    st.setBackground(st.root);
    var a = st.createTag("g");
    a.setAttribute("id", "0");
    st.root.appendChild(a);
    a.appendChild(st.createTag("defs"));
    a.appendChild(st.createTag("g"));
    var b = new st.sprite(this.animation.MainFrame, a);
    st.timer = setInterval(function() {
      b.showFrame()
    }, st.interval)
  };
  st.stop = function() {
    clearInterval(st.timer)
  };
  st.resume = function() {
    st.timer = setInterval(function() {
      mainMovie.showFrame()
    }, st.interval)
  };
  st.setBackground = function(a) {
    var b = st.createTag("rect"),
      d = {
        x: this.animation.FrameRect.xmin,
        y: this.animation.FrameRect.ymin,
        width: this.animation.FrameWidth,
        height: this.animation.FrameHeight,
        fill: this.animation.BackgroundColor
      },
      c;
    for (c in d) b.setAttribute(c, d[c]);
    a.appendChild(b)
  };

  return st;
})()

export default animationPlayer

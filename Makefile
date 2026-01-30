.PHONY: demo-v3 demo-v4 demo-all docs

demo-v3:
	@fuser -k 8083/tcp >/dev/null 2>&1 || true
	cd demo/demo-v3 && npm install && npm run dev -- --clearScreen false

demo-v4:
	@fuser -k 8084/tcp >/dev/null 2>&1 || true
	cd demo/demo-v4 && npm install && npm run dev -- --clearScreen false

demo-all:
	@$(MAKE) demo-v3 &
	@$(MAKE) demo-v4 &
	@wait

docs:
	cd docs && npm install && npm run dev

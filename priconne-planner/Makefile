approve-characters:
	cp ../../priconne-planner-data/etc/characters.json src/assets

deploy:
	ng build --prod
	tar cfz build.tgz dist/priconne-planner/
	scp build.tgz vps:~/
	ssh vps

%% Analysis of tempo test
clc
clear

%% Import the data
filename = 'data.txt';
fid = fopen(filename);
elements = textscan(fid,'%f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %s %s %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %s %s %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %f %s','delimiter',',');
fclose(fid);

for i = 1:40
    steady(:,i) = elements{i};
    fast(:,i) = elements{i+42};
    slow(:,i) = elements{i+84};
end

sexE = elements{41};
ageE = elements{42};
instE = elements{83};
trainE = elements{84};
countE = elements{125};

%% Calculate the number of records from each category
females = length(find(strcmp(sexE,'sex1')));
males = length(sexE) - females;

ageUnder12 = length(find(strcmp(ageE,'age1')));
age12to17 = length(find(strcmp(ageE,'age2')));
age18to24 = length(find(strcmp(ageE,'age3')));
age25to34 = length(find(strcmp(ageE,'age4')));
age35to44 = length(find(strcmp(ageE,'age5')));
age45to54 = length(find(strcmp(ageE,'age6')));
age55to64 = length(find(strcmp(ageE,'age7')));
age65to74 = length(find(strcmp(ageE,'age8')));
ageOver75= length(find(strcmp(ageE,'age9')));

instNo = length(find(strcmp(instE,'inst1')));
instPerc = length(find(strcmp(instE,'inst2')));
instWind = length(find(strcmp(instE,'inst3')));
instString = length(find(strcmp(instE,'inst4')));
instMult = length(find(strcmp(instE,'inst5')));

trainNo = length(find(strcmp(trainE,'train1')));
trainL1 = length(find(strcmp(trainE,'train2')));
train1to3 = length(find(strcmp(trainE,'train3')));
train3to5 = length(find(strcmp(trainE,'train4')));
train5More = length(find(strcmp(trainE,'train5')));

countNo = length(find(strcmp(countE,'count1')));
countYes = length(find(strcmp(countE,'count2')));

%% Make relative asynchrony error

intervalF = 500;
intervalS = 500;

for i = 1:52
    intrvlsF(i) = intervalF;
    intervalF = intervalF - 5;
    
    intrvlsS(i) = intervalS;
    intervalS = intervalS + 5;
end

intrvalsFast = intrvlsF(12:51);
intrvalsSlow = intrvlsS(12:51);

steadyRel = steady/500*100;

for j = 1:40
    fastRel(:,j) = fast(:,j)/intrvalsFast(j)*100;
    slowRel(:,j) = slow(:,j)/intrvalsSlow(j)*100;
end

%% Calculate the means across the sequences

for k = 1:length(steadyRel)
    meanSteadyofParticipants(k,1) = mean(steadyRel(k,:));
    meanFastofParticipants(k,1) = mean(fastRel(k,:));
    meanSlowofParticipants(k,1) = mean(slowRel(k,:));
end

asynchronyMeans = [meanSteadyofParticipants meanFastofParticipants meanSlowofParticipants];

%% Calculate the means across the synchronization sequence

for k = 1:length(steadyRel)
    meanSteadyofParticipantsS(k,1) = mean(steadyRel(k,1:20));
    meanFastofParticipantsS(k,1) = mean(fastRel(k,1:20));
    meanSlowofParticipantsS(k,1) = mean(slowRel(k,1:20));
end

asynchronyMeansSynchronization = [meanSteadyofParticipantsS meanFastofParticipantsS meanSlowofParticipantsS];

%% Distribution of means in synchronization sequences

figure
histogram(meanSteadyofParticipantsS, 15)
figure
histogram(meanFastofParticipantsS, 15)
figure
histogram(meanSlowofParticipantsS, 15)

% Kolmogorov-Smirnov test
hS1 = kstest(meanSteadyofParticipantsS);
hS2 = kstest(meanFastofParticipantsS);
hS3 = kstest(meanSlowofParticipantsS);

% The result of the test is 1 for all vectors of asynchrony relative
% error, therefore the null hypothesis that the data in these vector
% come from a standard normal distribution was rejected

% We cannot use classic one way ANOVA test, therefore ...

%% ..Kurskal-Wallis one-way ANOVA test is used instead
% synchronization sequence

[pS,tblS,statsS] = kruskalwallis(asynchronyMeansSynchronization);
% p is very small, therefore the null hypothesis that the mean of 
% asynchrony errors of isochronous and gradually changing tempos are equal
% is rejected

%% Display the comparison box plots of synchronization sequence

figure('rend','painters','pos',[10 10 900 800])
boxplot(asynchronyMeansSynchronization)
ylabel('Relative asynchrony [%]','FontSize',18)
xlabel('Sequences: isochronous, speeding up, slowing down','FontSize',18)

title('Relative asynchronies in the synchronization part','FontSize',20)
ylim([-100 100])
%% Calculate the means across the continuation sequence

for k = 1:length(steadyRel)
    meanSteadyofParticipantsC(k,1) = mean(steadyRel(k,21:40));
    meanFastofParticipantsC(k,1) = mean(fastRel(k,21:40));
    meanSlowofParticipantsC(k,1) = mean(slowRel(k,21:40));
end

asynchronyMeansContinuation = [meanSteadyofParticipantsC meanFastofParticipantsC meanSlowofParticipantsC];

%% Distribution of means in continuation sequences

figure
histogram(meanSteadyofParticipantsC, 15)
figure
histogram(meanFastofParticipantsC, 15)
figure
histogram(meanSlowofParticipantsC, 15)

% Kolmogorov-Smirnov test
hC1 = kstest(meanSteadyofParticipantsC);
hC2 = kstest(meanFastofParticipantsC);
hC3 = kstest(meanSlowofParticipantsC);

% The result of the test is 1 for all vectors of asynchrony relative
% error, therefore the null hypothesis that the data in these vector
% come from a standard normal distribution was rejected

% We cannot use classic one way ANOVA test, therefore ...

%% ..Kurskal-Wallis one-way ANOVA test is used instead
% continuation sequence

[pC,tblC,statsC] = kruskalwallis(asynchronyMeansContinuation);
% p is very small, therefore the null hypothesis that the mean of 
% asynchrony errors of isochronous and gradually changing tempos are equal
% is rejected
%% Display the comparison box plots of continuation sequence

figure('rend','painters','pos',[10 10 900 800])
boxplot(asynchronyMeansContinuation)
xlabel('Sequences: isochronous, speeding up, slowing down','FontSize',18)
ylabel('Relative asynchrony [%]','FontSize',18)
title('Relative asynchronies in the continuation part','FontSize',20)
ylim([-500 600])
%% Display the Relative asynchronies in the isochronous sequence

figure('rend','painters','pos',[10 10 900 800])
boxplot(steadyRel)
xlabel('Position in the sequence','FontSize',18)
ylabel('Relative asynchrony [%]','FontSize',18)
title('Relative asynchronies in the isochronous sequence','FontSize',20)
ylim([-800 1000])

%% Display the Relative asynchronies in the speeding up sequence

figure('rend','painters','pos',[10 10 900 800])
boxplot(fastRel)
xlabel('Position in the sequence','FontSize',18)
ylabel('Relative asynchrony [%]','FontSize',18)
title('Relative asynchronies in the speeding up sequence','FontSize',20)
ylim([-800 1000])

%% Display the Relative asynchronies in the slowing down sequence

figure('rend','painters','pos',[10 10 900 800])
boxplot(slowRel)
xlabel('Position in the sequence','FontSize',18)
ylabel('Relative asynchrony [%]','FontSize',18)
title('Relative asynchronies in the slowing down sequence','FontSize',20)
ylim([-800 1000])


from django.http import HttpResponseRedirect
from django.shortcuts import render 
from django.contrib.auth.models import User


def home(request,id=0):
    if request.method=='GET':
        return render(request,'index.html')

def userprofile(request,id=0):
    if request.method=='GET':
        userid=request.user
        user=User.objects.get(username=userid)
        if user.is_staff:
            return render(request,'staffprofile.html')
        else:
            return render(request,'userprofile.html')

def about(request,id=0):
    if request.method=='GET':
        return render(request,'about.html')

def attendance(request,id=0):
    if request.method=='GET':
        return render(request,'attendance.html')

def reports(request,id=0):
    if request.method=='GET':
        return render(request,'reports.html')

def staffreports(request,id=0):
    if request.method=='GET':
        return render(request,'staffreport.html')

def start(request,id=0):
    if request.method=='GET':
        return render(request,'start.html')

def signup(request,id=0):
    if request.method=='GET':
        return render(request,'registration/login.html')
    elif request.method=='POST':
        firstname=request.POST.get('firstname',None)
        lastname=request.POST.get('lastname',None)
        username=request.POST.get('username',None)
        password=request.POST.get('password',None)
        email=request.POST.get('email',None)
        user=User.objects.create_user(username,email=email,password=password)
        user.first_name=firstname
        user.last_name=lastname
        user.save()
        return render(request,'index.html') 

def allowattendance(request,id=0):
    if request.method=='GET':
        return render(request,'createattendance.html')